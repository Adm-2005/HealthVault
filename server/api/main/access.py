import sqlalchemy as sa
from flask import request, url_for
from flask_jwt_extended import get_jwt_identity

from api import db
from api.main import main_bp
from api.errors import bad_request
from api.auth.utils import roles_required
from api.main.utils import generate_qrcode
from api.models import User, Patient, Doctor, HealthRecord, AccessControl

@main_bp.route('/access/<int:id>', methods=['GET'])
def get_access_package(id):
    """
    Fetches an access package

    Args:
        id[int]: primary key of 'access_controls' table 
    
    Returns:
        [json]: access package in json format
    """
    try:
        return db.get_or_404(AccessControl, id).to_dict()
    
    except Exception as e:
        return {"error": str(e)}, 500

@main_bp.route('/access/user/<int:id>', methods=['GET'])
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
            rows = db.session.scalars(query).all()
        elif user.role == 'doctor':
            query = sa.select(Doctor.accesses_received).where(Doctor.user_id == id)
            rows = db.session.scalars(query).all()
        
        data['num_accesses'] = len(rows)
        data['accesses'] = rows

        return data 
    
    except Exception as e:
        return {"error": str(e)}, 500
    
@main_bp.route('/', methods=[''])
def revoke_access_from_doctor():
    """"""

@main_bp.route('/access', methods=['POST'])
def create_access():
    """Creates an access"""
    data = request.get_json()

@main_bp.route('/access/<int:id>', methods=['DELETE'])
def delete_access(id):
    """
    Deletes access 

    Args:
        id[int]: primary key of access_controls table
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