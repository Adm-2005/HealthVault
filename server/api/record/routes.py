# package/library imports
import os
from datetime import datetime
import sqlalchemy as sa
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import request, url_for, current_app, jsonify

# application imports
from api import db
from api.record import hr_bp
from api.errors import bad_request
from api.record.utils import validate_file, upload_file
from api.models import HealthRecord, Patient

@hr_bp.route('/<int:id>', methods=['GET'])
def get_record(id: int):
    """
    Fetch specified health record.

    Args:
        id[int]: primary key of health_records table
    
    Returns:
        [json]: details of record in json format
    """
    return db.get_or_404(HealthRecord, id).to_dict(), 200

@hr_bp.route('/patient/<int:id>', methods=['GET'])
@jwt_required()
def get_all_records_of_patient(id):
    """
    Fetch all records associated with a patient.

    Args:
        id[int]: foreign key in health_records table that references patients table

    """
    try:
        current_user_id = get_jwt_identity()
        query = sa.select(Patient).where(Patient.user_id == current_user_id)
        patient = db.session.scalars(query).first()

        if current_user_id == patient.user_id:
            query = sa.select(HealthRecord).where(HealthRecord.patient_id == id)
            page = request.args.get('page', 1, type=int)
            per_page = min(request.args.get('per_page', 10, type=int), 100)

            return jsonify(HealthRecord.to_collection_dict(query, page, per_page, 'records.get_all_records_of_patient')), 200

        else:
            return jsonify({"error": "Unauthorized access"}), 403
    
    except Exception as e: 
        print(f"Error while fetching all records of patient: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@hr_bp.route('/', methods=['POST'])
@jwt_required()
def upload_record():
    """ Create a record """

    MAX_FILE_SIZE = current_app.config["MAX_FILE_SIZE"]
    HR_DIR = current_app.config["HR_DIR"]
    ALLOWED_EXTENSIONS = current_app.config["ALLOWED_EXTENSIONS"]

    try:
        current_user_id = get_jwt_identity()
        
        title = request.form.get("title")
        record_date = request.form.get("record_date")

        try:
            record_date = datetime.strptime(record_date, "%Y-%m-%d").date()
        except ValueError as ve:
            print(f"Error while converting record_date: {ve}")
            return bad_request("Invalid date format. Please use \"YYYY-MM-DD\" format.")

        if not title or not record_date:
            return bad_request("Must include title and record_date fields.")
        
        if 'file' not in request.files:
            return bad_request("Must include health record file.")
        
        f = request.files['file']
        
        try: 
            validate_file(f, MAX_FILE_SIZE, ALLOWED_EXTENSIONS)
        except ValueError as ve:
            print(f"Error while validating file: {ve}")
            return bad_request(f"{ve}")
            
        file_url = upload_file(f, HR_DIR)
        
        query = sa.select(Patient).where(Patient.user_id == current_user_id)
        patient = db.session.scalars(query).first()
        if not patient:
            return bad_request("Patient does not exists.")

        data = {
            "title": title.strip(), # sanitizing title before creating the record
            "patient_id": patient.id,
            "record_date": record_date,
            "file_url": file_url,
            "file_type": f.filename.rsplit('.', 1)[1].lower()
        }

        if 'notes' in request.form:
            data['notes'] = request.form.get('notes').strip()

        record = HealthRecord()
        record.from_dict(data)
        db.session.add(record)
        db.session.commit()

        patient.records.append(record)

        return jsonify(record.to_dict()), 201, {'Location': url_for('record.get_record', id=record.id)}
    
    except Exception as e:
        print(f"Error while uploading record: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@hr_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_record(id: int):
    """
    Updates the record with the given id

    Args:
        id: primary key for health_records table
    """
    MAX_FILE_SIZE = current_app.config["MAX_FILE_SIZE"]
    HR_DIR = current_app.config["HR_DIR"]
    ALLOWED_EXTENSIONS = current_app.config["ALLOWED_EXTENSIONS"]
    
    try:
        record = db.get_or_404(HealthRecord, id)
        data = {}

        if 'title' in request.form:
            data['title'] = request.form.get('title').strip()
            
        if 'record_date' in request.form:
            try:
                data['record_date'] = datetime.strptime(request.form.get('record_date'), "%Y-%m-%d").date()
            except ValueError as ve:
                print(f"Error while converting record_date: {ve}")
                return bad_request("Invalid date format. Please use \"YYYY-MM-DD\" format.")

        if 'notes' in request.form:
            data['notes'] = request.form.get('notes').strip()
 
        if 'file' in request.files:
            f = request.files['file']
            
            try:
                validate_file(f, MAX_FILE_SIZE, ALLOWED_EXTENSIONS)
            except ValueError as ve:
                print("Error while validating file: {ve}")
                return bad_request()
            
            file_url = upload_file(f, HR_DIR)

            data['file_url'] = file_url
            data['file_type'] = f.filename.rsplit('.', 1)[1].lower()
    
            if record.file_url and os.path.exists(record.file_url):
                os.remove(record.file_url)

        with db.session.begin_nested():
            record.from_dict(data)
            db.session.commit()

        return jsonify(record.to_dict()), 200, {'Location': url_for('record.get_record', id=record.id)}

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