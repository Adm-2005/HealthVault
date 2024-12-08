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
    Fetches an access package

    Args:
        id: primary key of 'access_controls' table 
    
    Returns:
        Tuple[dict, int]: Json representation of access package and http status code
    """
    return jsonify(db.get_or_404(AccessControl, id).to_dict()), 200

@ac_bp.route('/user/<int:id>', methods=['GET'])
@jwt_required()
def get_all_packages(id):
    """
    Fetches all access packages associated with an user

    Args:
        id[int]: user id

    Returns:
        [json]: list of access packages and their count
    """
    try:
        data = {}

        user = db.get_or_404(User, id).to_dict()
        
        if user.role == 'patient':
            query = sa.select(Patient.accesses_sent).where(Patient.user_id == id)

            return jsonify(Patient.to_collection_dict(query, 1, 10, 'access_control.get_all_packages'))
        elif user.role == 'doctor':
            query = sa.select(Doctor.accesses_received).where(Doctor.user_id == id)
    
    except Exception as e:
        print("Error while fetching all packages")
        return {"error": "Internal Server Error"}, 500

@ac_bp.route('/', methods=['POST'])
@jwt_required()
def create_access():
    """Creates an access package"""
    try:
        current_user_id = get_jwt_identity()

        data = request.get_json()
    except Exception as e:
        print("Error while creating access: {e}")

@ac_bp.route('/<int:access_id>/doctor/<int:doc_id>', methods=['PUT'])
@jwt_required()
def revoke_access_from_doctor(access_id: int, doc_id: int):
    """
    Revokes access of the given package from the doctor.

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