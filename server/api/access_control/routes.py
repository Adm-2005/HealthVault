import sqlalchemy as sa
from flask import request, jsonify, url_for
from flask_jwt_extended import get_jwt_identity, jwt_required
from typing import Tuple

from api import db
from api.access_control import ac_bp
from api.errors import bad_request
from api.auth.utils import roles_required
from api.access_control.utils import generate_qrcode
from api.models import User, Patient, Doctor, HealthRecord, AccessControl

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
    return db.get_or_404(AccessControl, id).to_dict(), 200

@ac_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_packages():
    """Fetches all access packages associated with an user"""
    try:
        current_user_id = get_jwt_identity()
        query = sa.select(User).where(User.id == current_user_id)
        user = db.session.scalars(query).first()

        if user.role == 'patient': 
            query = sa.select(AccessControl).where(AccessControl.patient_id == user.patient.id)
        elif user.role == 'doctor':
            query = sa.select(AccessControl).where(AccessControl.doc_id == user.doctor.id).order_by(AccessControl.access_date)
    except Exception as e:
        print("Error while fetching all packages: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@ac_bp.route('/grant', methods=['POST'])
@jwt_required()
def grant_access():
    """Creates an access package, granting access to a doctor"""
    try:
        current_user_id = get_jwt_identity()

        data = request.get_json()
    except Exception as e:
        print("Error while creating access: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@ac_bp.route('/revoke', methods=['PUT'])
@jwt_required()
def revoke_access():
    """
    Revokes access of a package from a doctor.

    Args:
        access_id: primary key of 'access_controls' table.
        doc_id: primary key of 'doctors' table.

    """

@ac_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_access(id: int):
    """
    Deletes the access with given id. 

    Args:
        id: primary key of access_controls table
    """
    try:
        query = sa.select(AccessControl).where(AccessControl.id == id)
        row = db.session.execute(query).scalar_one_or_none

        if row is None:
            return {"error": "Access Control not found"}, 404
        
        db.session.delete(row)
        db.session.commit()

        return "", 204
    
    except Exception as e:
        return {"error": str(e)}, 500