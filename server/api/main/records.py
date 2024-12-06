# package/library imports
import os
import sqlalchemy as sa
from datetime import datetime, timezone
from werkzeug.utils import secure_filename
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import request, url_for, send_from_directory, current_app

# application imports
from api import db
from api.main import main_bp
from api.errors import bad_request
from api.auth.utils import roles_required
from api.main.utils import allowed_filename
from api.models import User, HealthRecord, Patient, Doctor, AccessControl

@main_bp.route('/records/<int:id>', methods=['GET'])
def get_record(id):
    """
    Fetch specified health record

    Args:
        id[int]: primary key of health_records table
    
    Returns:
        [json]: details of record in json format
    """
    return db.get_or_404(HealthRecord, id).to_dict()

@main_bp.route('/records/patient/<int:id>', methods=['GET'])
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

        if current_user_id == id:
            data = {}
            query = sa.select(HealthRecord).where(HealthRecord.patient_id == id)
            query_result = db.session.scalars(query).all()

            records = [record.to_dict() for record in query_result]

            data['num_records'] = len(records)
            data['records'] = records

            return data

        else:
            return {"error": "Unauthorized access"}, 403
    
    except Exception as e:
        return {"error": str(e)}, 500

@main_bp.route('/records', methods=['POST'])
def upload_record():
    """ Create a record """
    try:
        data = request.get_json()

        if 'file_type' not in data or 'file_url' not in data or 'title' not in data or 'record_data' not in data:
            return bad_request("Must include Title, File Type, File URL and Date fields.")
        if data['file_type'] not in ['.pdf', '.docx', '.jpeg', '.jpg', '.doc']:
            return bad_request("Allowed file types: .pdf, .docx, .jpeg, .jpg, .doc")

        record = HealthRecord()
        record.from_dict(data)
        db.session.add(record)
        db.session.commit()

        return record.to_dict(), 201, {'Location': url_for('main.records.get_record', id=record.id)}
    
    except Exception as e:
        return {"error": str(e)}, 500

@main_bp.route('/records/<int:id>', methods=['PUT'])
def update_record(id):
    try:
        record = db.get_or_404(HealthRecord, id)
        data = request.get_json()

        if data['file_type'] not in ['.pdf', '.docx', '.jpeg', '.jpg', '.doc']:
            return bad_request("Allowed file types: .pdf, .docx, .jpeg, .jpg, .doc")

        record.from_dict(data)
        db.session.commit()

        return record.to_dict()

    except Exception as e:
        return {"error": str(e)}, 500

@main_bp.route('/records/<int:id>', methods=['DELETE'])
def delete_record(id):
    try:
        query = sa.select(HealthRecord).where(HealthRecord.id == id)
        row = db.session.execute(query).scalar_one_or_none

        if row is None:
            return {"error": "Health record not found"}, 404
        
        db.session.delete(row)
        db.session.commit()

        return "", 204
    
    except Exception as e:
        return {"error": str(e)}, 500