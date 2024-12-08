import sqlalchemy as sa
from flask import request, jsonify, current_app
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity
)
from sqlalchemy.exc import IntegrityError

from api import db
from api.auth import auth_bp
from api.models import User, Patient, Doctor

@auth_bp.route('/register', methods=['POST'])
def register():
    """Registers a new user based on their role."""
    AVATAR_DIR = current_app.config['AVATAR_DIR']
    try:
        data = request.get_json()

        required_fields = ['username', 'email', 'password', 'role']

        if not data or not all(field in data for field in required_fields):
            return {"error": "Missing required fields."}, 400

        if data['role'] not in ['patient', 'doctor']:
            return {"error": "Invalid role specified."}, 400

        if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
            return {"error": "Username or Email already exists"}, 400
        
        user = User()
        user.from_dict(data, new_user=True)

        user.set_avatar(AVATAR_DIR)

        db.session.add(user)
        db.session.flush()

        if data['role'] == 'doctor':
            if not data['license_number']:
                return {"error": "Missing License Number"}, 400
        
        db.session.commit()

        if data['role'] == 'patient':
            patient = Patient()
            patient.user_id = user.id
            db.session.add(patient)
            db.session.commit()
        else:
            doctor = Doctor()
            doctor.user_id = user.id
            doctor.specialization = data["specialization"] if "specialization" in data else ""
            doctor.license_number = data["license_number"]
            db.session.add(doctor)
            db.session.commit()

        return jsonify({"message": "User registered successfully!"}), 201
    
    except IntegrityError as e:
        db.session.rollback()
        print(f"Error while registering user: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
    
    except Exception as e:
        db.session.rollback()
        print(f"Error while registering user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if not data or not all(field in data for field in ('username', 'password')):
            return {"error": "Missing required fields."}, 400

        user = User.query.filter_by(username=data['username']).first()

        if not user or not user.check_password(data['password']):
            return {"error": "Invalid username or password."}, 400

        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token
        }), 200
    except Exception as e:
        print(f"Error while logging user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        current_user_id = get_jwt_identity()
        access_token = create_access_token(identity=current_user_id)
        return {"access_token": access_token}, 200
    except Exception as e:
        print(f"Error while refreshing token: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500