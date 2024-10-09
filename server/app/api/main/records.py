# package/library imports
import sqlalchemy as sa
from flask import request, url_for

# application imports
from app.models import User, HealthRecord, Patient, Doctor, AccessControl
from app.api.main import bp
from app.api.main.utils import generate_qrcode

@bp.route('/<int:id>', methods=['GET'])
def get_record(id):
    """
    Fetch specified health record

    Args:
        id[int]: primary key of health_records table
    
    Returns:
        [json]: details of record in json format
    """
    pass

@bp.route('/<int:id>', methods=['GET'])
def get_all_records_of_user(id):
    """
    Fetch all records associated with a user

    Args:
        id[int]: primary key of users table

    Returns:
        [json]: collection of records in json format
    """


@bp.route('/', methods=['POST'])
def create_record():
    """ Create a record """
    data = request.get_json()

@bp.route('/<int:id>', methods=['PUT'])
def update_record(id):
    pass

@bp.route('/<int:id>', methods=['DELETE'])
def delete_record(id):
    pass

