import sqlalchemy as sa
from flask import request
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity
)
from sqlalchemy.exc import IntegrityError

from app import db
from app.api.auth import bp
from app.models import User, Doctor

@bp.route('/register', methods=['POST'])
def register():
    """Registers a new user based on their role."""
    data = request.get_json()

    required_files = ['username', 'email', 'password', 'role']

    if not data or not all(field in data for field in required_files):
        return {"error": "Missing required fields."}, 400
    
    if data['role'] not in ['patient', 'doctor']:
        return {"error": "Invalid role specified."}, 400

    if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
        return {"error": "Username or Email already exists"}, 400
    
    try:
        user = User()
        user.from_dict(data, new_user=True)

        db.session.add(user)
        db.session.flush()

        if data['role'] == 'doctor':
            if not data['license_number']:
                return {"error": "Missing License Number"}, 400
            doc = Doctor.query.filter_by(user_id = user.id).first()
            doc.specialization = data['specialization'] if 'specialization' in data else ""
            doc.license_number = data['license_number']
        
        db.session.commit()

        return {"message": "User registered successfully!"}, 201
    
    except IntegrityError as e:
        db.session.rollback()
        return {"error": "Database Integrity Error"}, 500
    
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not all(field in data for field in ('username', 'password')):
        return {"error": "Missing required fields."}, 400
    
    user = User.query.filter_by(username=data['username']).first()

    if not user or not user.check_password(data['password']):
        return {"error": "Invalid username or password."}, 400

    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }, 200

@bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    return {"access_token": access_token}, 200