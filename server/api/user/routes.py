import os
import sqlalchemy as sa
from flask import request, current_app, send_from_directory, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from typing import Tuple

from api import db
from api.models import User, Patient, Doctor
from api.user import user_bp
from api.errors import bad_request

@user_bp.route('/<int:id>', methods=['GET'])
def get_user(id: int) -> Tuple[dict, int]:
    """
    Fetches the user with the given user id.
    
    Args
        id: primary key of users table
    """
    return jsonify(db.get_or_404(User, id).to_dict()), 200

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile() -> Tuple[dict, int]:
    try:
        current_user_id = get_jwt_identity()
        return jsonify(db.get_or_404(User, current_user_id).to_dict()), 200
    except Exception as e:
        print(f"Error while fetching profile: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/avatar/<avatar_name>', methods=['GET'])
def serve_avatar(avatar_name: str):
    """
    Serves avatar images to client.
    """
    AVATAR_DIR = current_app.config["AVATAR_DIR"]
    try:
        return send_from_directory(AVATAR_DIR, avatar_name)
    except FileNotFoundError as fe:
        print(f"Error while serving avatar image: {fe}")
        return jsonify({"error": "Image not found"}), 404
    except Exception as e:
        print(f"Error while serving avatar image: {e}")
        return jsonify({"error": "Internal Server Error"}), 500

@user_bp.route('/', methods=['GET'])
def get_all_users() -> Tuple[dict, int]:
    """Fetches all the users."""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        return User.to_collection_dict(sa.select(User), page, per_page, 'user.get_all_users')
    except Exception as e:
        print(f"Error while fetching all user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/patient/<int:id>', methods=['GET'])
def get_patient(id: int) -> Tuple[dict, int]:
    """
    Fetches patient with the given id.

    Args
        id: primary key of 'patients' table

    Returns 
        (dict, int): json representation of patient and status code        
    """
    return jsonify(db.get_or_404(Patient, id).to_dict()), 200

@user_bp.route('/patients', methods=['GET'])
def get_all_patients():
    """Fetches all the patients"""
    try:
        query = sa.select(User).where(User.role == 'patient').order_by(User.first_name)
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)

        return User.to_collection_dict(query, page, per_page, 'user.get_all_patients')
    except Exception as e:
        print(f"Error while fetching all patients: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/patient', methods=['GET'])
@jwt_required()
def get_patient_for_current_user():
    """Fetches doctor's information for current user"""
    try:
        current_user_id = get_jwt_identity()
        query = sa.select(Patient).where(Patient.user_id == current_user_id)
        patient = db.session.scalars(query).first()

        if not patient:
            print(f"Error while fetching patient using user_id: {e}")
            return jsonify({ "error": "Patient not found" }), 404

        return jsonify(patient.to_dict()), 200
    except Exception as e:
        print(f"Error while fetching patient using user_id: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/doctor/<int:id>', methods=['GET'])
def get_doctor(id: int) -> Tuple[dict, int]:
    """
    Fetches doctor with the given id.

    Args
        id: primary key of 'doctors' table

    Returns
        (dict, int): json implementation of doctor object and http status code
    """
    return jsonify(db.get_or_404(Doctor, id)), 200

@user_bp.route('/doctor', methods=['GET'])
@jwt_required()
def get_doctor_for_current_user():
    """Fetches doctor's information for current user"""
    try:
        current_user_id = get_jwt_identity()
        query = sa.select(Doctor).where(Doctor.user_id == current_user_id)
        doctor = db.session.scalars(query).first()

        if not doctor:
            print(f"Error while fetching doctor using user_id: {e}")
            return jsonify({ "error": "Doctor not found" }), 404

        return jsonify(doctor.to_dict()), 200
    except Exception as e:
        print(f"Error while fetching doctor using user_id: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/doctors', methods=['GET'])
def get_all_doctors() -> Tuple[dict, int]:
    """Fetches all the doctors"""
    try:
        query = sa.select(User).where(User.role == 'doctor').order_by(User.first_name)
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)

        return User.to_collection_dict(query, page, per_page, 'user.get_all_doctors')
    except Exception as e:
        print(f"Error while fetching all doctors: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@jwt_required()
@user_bp.route('/<int:id>', methods=['PUT'])
def update_user(id: int) -> Tuple[dict, int]:
    """
    Updates the user with the given id based on the payload received.

    Args
        id: primary key of 'users' table

    Returns
        (dict, int): json data and http status code
    """
    try:
        user = db.get_or_404(User, id)
        data = request.get_json()

        if 'username' in data and data['username'] != user.username and \
        db.session.scalar(
            sa.select(User).
            where(User.username == data['username'])
        ):
            return bad_request("Please use a different username.")
        
        if 'email' in data and data['email'] != user.email and \
        db.session.scalar(
            sa.select(User).
            where(User.email == data['email'])
        ):
            return bad_request("Please use a different email.")

        user.from_dict(data)
        db.session.commit()

        return jsonify(user.to_dict()), 200
    
    except Exception as e:
        print(f"Error while updating user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@jwt_required()
@user_bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id: int) -> Tuple[dict, int]:
    """
    Deletes the user with given id

    Args
        id: primary key of 'users' table

    Returns
        (dict, int): json data and http status code
    """
    try:
        query = sa.delete(User).where(User.id == id)
        row = db.session.execute(query).scalar_one_or_none

        if row is None:
            return {"error": "User not found"}, 404
            
        db.session.delete(row)    
        db.session.commit()

        return jsonify({ "message": "User deleted successfully" }), 204
    
    except Exception as e:
        print(f"Error while deleting user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500