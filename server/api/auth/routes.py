import sqlalchemy as sa
from flask import request, jsonify, current_app, make_response
from flask_jwt_extended import create_access_token
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
            return jsonify({"error": "Missing required fields."}), 400

        if data['role'] not in ['patient', 'doctor']:
            return jsonify({"error": "Invalid role specified."}), 400

        if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
            return jsonify({"error": "Username or Email already exists"}), 400
        
        user = User()
        user.from_dict(data, new_user=True)
        
        user.set_avatar(AVATAR_DIR)

        db.session.add(user)
        db.session.flush()

        if data['role'] == 'doctor':
            if not data['license_number']:
                return jsonify({"error": "Missing License Number"}), 400

        if data['role'] == 'patient':
            patient = Patient()
            patient.user_id = user.id
            user.patient = patient
            db.session.add(patient)

        else:
            doctor = Doctor()
            doctor.user_id = user.id
            doctor.license_number = data["license_number"]
            doctor.specialization = data["specialization"] if "specialization" in data else ""
            doctor.affiliation = data["affiliation"] if "affiliation" in data else ""
            user.doctor = doctor
            db.session.add(doctor)

        db.session.commit()

        return jsonify({"message": "User registered successfully!", "user": user.to_dict() }), 201
    
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
            return jsonify({"error": "Missing required fields."}), 400

        user = User.query.filter_by(username=data['username']).first()

        if not user or not user.check_password(data['password']):
            return jsonify({"error": "Invalid username or password."}), 400

        access_token = create_access_token(identity=user.id)

        response = make_response({ "message": "Login successful", "user": user.to_dict() })
        response.set_cookie(
            "healthvault_access_token", 
            access_token, 
            httponly=True, 
            secure=True, 
            samesite=None
        )

        return response, 200

    except Exception as e:
        print(f"Error while logging user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500
    
@auth_bp.route('/logout', methods=['POST'])
def logout():
    try:
        response = make_response({ "message": "Logout successful" })
        response.delete_cookie("healthvault_access_token")
        
        return response, 200
    
    except Exception as e:
        print(f"Error while logging out user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500