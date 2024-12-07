# package/library imports
import os
import sqlalchemy as sa
from datetime import datetime, timezone
from werkzeug.utils import secure_filename
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import request, url_for, current_app, jsonify

# application imports
from api import db
from api.record import hr_bp
from api.errors import bad_request
from api.record.utils import allowed_filename
from api.models import User, HealthRecord, Patient, Doctor, AccessControl

MAX_FILE_SIZE = current_app.config["MAX_FILE_SIZE"]
HR_DIR = current_app.config["HR_DIR"]
ALLOWED_EXTENSIONS = current_app.config["ALLOWED_EXTENSIONS"]

@hr_bp.route('/<int:id>', methods=['GET'])
def get_record(id):
    """
    Fetch specified health record

    Args:
        id[int]: primary key of health_records table
    
    Returns:
        [json]: details of record in json format
    """
    return jsonify(db.get_or_404(HealthRecord, id).to_dict()), 200

@hr_bp.route('/patient/<int:id>', methods=['GET'])
@jwt_required()
def get_all_records_of_patient(id):
    """
    Fetch all records associated with a patient

    Args:
        id[int]: foreign key in health_records table that references patients table

    Returns:
        [json]: collection of records in json format
    """
    try:
        current_user_id = get_jwt_identity()
        query = sa.select(Patient).where(Patient.user_id == current_user_id)
        patient = db.session.scalars(query).first()

        if current_user_id == patient.user_id:
            query = sa.select(HealthRecord).where(HealthRecord.patient_id == id)
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 100)

            return jsonify(HealthRecord.to_collection_dict(query, page, per_page, 'api.records.get_all_records_of_patient')), 200

        else:
            return jsonify({"error": "Unauthorized access"}), 403
    
    except Exception as e: 
        print(f"Error while fetching all records of patient: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@hr_bp.route('/', methods=['POST'])
@jwt_required()
def upload_record():
    """ Create a record """
    try:
        current_user_id = get_jwt_identity()

        data = request.get_json()

        if not data or not all(field in data for field in ["title", "record_date"]):
            return bad_request("Missing required fields.")
        
        if 'file' in request.files:
            f = request.files['file']

            if not allowed_filename(f.filename):
                return bad_request("File type not allowed.")

            if f.content_length > MAX_FILE_SIZE:
                return bad_request("File size exceeds limit.")

            if f.filename == '':
                return bad_request("No selected file.")
            else:
                os.makedirs(HR_DIR, exist_ok=True)
                file_url = os.path.join(HR_DIR, secure_filename(f.filename))
                f.save(file_url)
                data['file_url'] = file_url
                data['file_type'] = f.filename.rsplit('.', 1)[1].lower()
        else:
            return bad_request("Must include health record file.")
        
        data["patient_id"] = current_user_id

        record = HealthRecord()
        record.from_dict(data)
        db.session.add(record)
        db.session.commit()

        query = sa.select(Patient).where(Patient.user_id == current_user_id)
        patient = db.session.scalars(query).first()
        patient.records.append(record)

        return jsonify(record.to_dict()), 201, {'Location': url_for('api.records.get_record', id=record.id)}
    
    except Exception as e:
        print(f"Error while uploading record: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@hr_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_record(id):
    try:
        record = db.get_or_404(HealthRecord, id)
        data = request.get_json()

        if 'file' in request.files:
            f = request.files['file']

            if not allowed_filename(f.filename):
                return bad_request("File type not allowed.")
            
            if f.content_length > MAX_FILE_SIZE:
                return bad_request("File size exceeds limit.")
            
            if f.filename == '':
                return bad_request("Not selected file.")
            else:
                os.makedirs(HR_DIR, exist_ok=True)
                file_url = os.path.join(HR_DIR, secure_filename(f.filename))
                f.save(file_url)
                data['file_url'] = file_url
                data['file_type'] = f.filename.rsplit('.', 1)[1].lower()

        record.from_dict(data)
        db.session.commit()

        return jsonify(record.to_dict()), 200

    except Exception as e:
        print(f"Error while updating record: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@hr_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_record(id):
    try:
        query = sa.select(HealthRecord).where(HealthRecord.id == id)
        row = db.session.execute(query).scalar_one_or_none()

        if row is None:
            return jsonify({"error": "Health record not found"}), 404
        
        db.session.delete(row)
        db.session.commit()

        return "", 204
    
    except Exception as e:
        print(f"Error while deleting record: {e}")
        return jsonify({"error": "Internal Server Error"}), 500