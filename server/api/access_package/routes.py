import sqlalchemy as sa
from flask import request, jsonify, url_for, current_app
from flask_jwt_extended import get_jwt_identity, jwt_required
from typing import Tuple

from api import db
from api.access_package import ac_bp
from api.errors import bad_request
from api.auth.utils import roles_required
from api.access_package.utils import generate_qrcode
from api.models import User, Patient, Doctor, HealthRecord, AccessPackage, HealthRecordAccessPackage

@ac_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_access_package(id: int) -> Tuple[dict, int]:
    """
    Fetches an access package with the given id.

    Args:
        id: primary key of 'access_controls' table 
    
    Returns:
        Tuple[dict, int]: Json representation of access package and http status code
    """
    return db.get_or_404(AccessPackage, id).to_dict(), 200

@ac_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_packages():
    """Fetches all access packages associated with an user"""
    try:
        page = max(request.args.get('page', 1, type=int), 1)
        per_page = min(request.args.get('per_page', 10, type=int), 100)

        current_user_id = get_jwt_identity()
        user = db.get_or_404(User, current_user_id)

        if user.role == 'patient': 
            query_for_sent_accesses = sa.select(AccessPackage)\
                                        .where(AccessPackage.patient_id == user.patient.id)\
                                        .order_by(AccessPackage.access_date)
            query_for_rec_accesses = sa.select(AccessPackage)\
                                       .where(AccessPackage.rec_patient_id == user.patient.id)\
                                       .order_by(AccessPackage.access_date)

            sent_accesses = AccessPackage.to_collection_dict(query_for_sent_accesses, page, per_page, 'access_control.get_all_packages')
            rec_accesses = AccessPackage.to_collection_dict(query_for_rec_accesses, page, per_page, 'access_control.get_all_packages')

            return jsonify({
                "sent_accesses": sent_accesses,
                "rec_accesses": rec_accesses
            }), 200

        elif user.role == 'doctor':
            query = sa.select(AccessPackage)\
                      .where(AccessPackage.doc_id == user.doctor.id)\
                      .order_by(AccessPackage.access_date)
            
            return jsonify(AccessPackage.to_collection_dict(query, page, per_page, 'access_control.get_all_packages')), 200

        else:
            return jsonify({ "error": "Invalid user role" }), 403
    
    except Exception as e:
        print(f"Error while fetching all packages: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@ac_bp.route('/create', methods=['POST'])
@jwt_required()
def create_access():
    """Creates an access package"""
    QR_DIR = current_app.config["QR_DIR"]
    try:
        current_user_id = get_jwt_identity()
        patient = db.session.scalars(sa.select(Patient).where(Patient.user_id == current_user_id)).first()

        if not patient:
            return jsonify({ "error": "Patient record not found" }), 404
        
        access_package = AccessPackage()
        access_package.patient_id = patient.id
        access_package.patient = patient

        db.session.add(access_package)
        db.session.flush()

        access_package.qrcode_url = generate_qrcode(url_for('access_package.get_access_package', id=access_package.id), access_package.id, QR_DIR)
        patient.accesses_sent.append(access_package)

        record_ids = request.args.getlist("hr_ids")

        try:
            record_ids = [int(id) for id in record_ids]
        except ValueError as ve:
            print(f"Error while converting record ids: {ve}")
            return jsonify({ "error": "Invalid record id" }), 400  

        records = db.session.scalars(sa.select(HealthRecord).where(
            HealthRecord.id.in_(record_ids), 
            HealthRecord.patient_id == patient.id
        )).all()

        if len(records) != len(record_ids):
            return jsonify({ "error": "Some records not found or unauthorized" }), 404

        for record in records:
            record.access_packages.append(access_package)
            access_package.health_records.append(record)

            hrap = HealthRecordAccessPackage()
            hrap.hr_id = record.id
            hrap.ac_id = access_package.id
            hrap.health_record = record
            hrap.access_package = access_package

            record.health_records_access_packages.append(hrap)
            access_package.health_records_access_packages.append(hrap)

            db.session.add(hrap) 

        db.session.commit()

        return jsonify(access_package.to_dict()), 201, { "Location": url_for('access_package.get_access_package', id=access_package.id) }
    
    except Exception as e:
        print(f"Error while creating access package: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@ac_bp.route('/grant/<int:id>', methods=['PUT'])
@jwt_required()
def grant_access(id: int):
    """
    Grants access of a package to a doctor
    
    Args
        id: primary key of 'access_package' table
    """
    try:
        current_user_id = get_jwt_identity()
        patient = db.session.scalars(sa.select(Patient).where(Patient.user_id == current_user_id)).first()
        
        if not patient:
            return jsonify({ "error": "Patient not found" }), 404
        
        access_package = db.session.scalars(sa.select(AccessPackage).where(AccessPackage.id == id)).first()

        if not access_package:
            return jsonify({ "error": "Access Package not found" }), 404

        if access_package.patient_id != patient.id:
            return jsonify({ "error": "Unauthorized Access" }), 403
        
        access_type = request.args.get('type')
        access_package.access_type = access_type if access_type else ""
        access_package.access_granted = True

        try:
            receiver_id = int(request.args.get('rec_id'))
        except ValueError as ve:
            return jsonify({ "error": "Invalid receiver id" }), 400

        if access_type == 'patient':
            rec_patient = db.get_or_404(Patient, receiver_id)
            access_package.rec_patient_id = rec_patient.id
            access_package.rec_patient = rec_patient 

        elif access_type == 'doctor':
            doctor = db.get_or_404(Doctor, receiver_id)
            access_package.doc_id = doctor.id
            access_package.doctor =  doctor

        return jsonify({ "message": "Access granted" }), 200

    except Exception as e:
        print(f"Error while granting access: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@ac_bp.route('/revoke/<int:id>', methods=['PUT'])
@jwt_required()
def revoke_access(id: int):
    """
    Revokes access of a package from a doctor.

    Args
        id: primary key of 'access_package' table

    """
    try:
        current_user_id = get_jwt_identity()
        patient = db.session.scalars(sa.select(Patient).where(Patient.user_id == current_user_id)).first()

        if not patient:
            return jsonify({ "error": "Patient not found" }), 404
        
        access_package = db.session.scalars(sa.select(AccessPackage).where(AccessPackage.id == id)).first()

        if not access_package:
            return jsonify({ "error": "Access Package not found" }), 404
        
        if access_package.patient_id != patient.id:
            return jsonify({ "error": "Unauthorized access" }), 403
        
        access_package.access_granted = False

        return jsonify({ "message": "Access revoked" }), 200

    except Exception as e:
        print(f"Error while revoking access: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@ac_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_access(id: int):
    """
    Deletes the access with given id. 

    Args
        id: primary key of access_package table
    """
    try:
        access = db.get_or_404(AccessPackage, id)
        
        db.session.delete(access)
        db.session.commit()

        return jsonify({ "message": "Access deleted successfully." }), 204
    
    except Exception as e:
        return jsonify({ "error": "Internal Server Error" }), 500