import sqlalchemy as sa
from flask import request, url_for, jsonify

from api import db
from api.models import User
from api.user import user_bp
from api.errors import bad_request

@user_bp.route('/<int:id>', methods=['GET'])
def get_user(id: int):
    """
    Fetches the user with the given user id.
    
    Args
        id: primary key of users table
    """
    return db.get_or_404(User, id).to_dict(), 200

@user_bp.route('/', methods=['GET'])
def get_all_users():
    """Fetches all the users."""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)
        return User.to_collection_dict(sa.select(User), page, per_page, 'user.get_all_users')
    except Exception as e:
        print("Error while fetching all user: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/patients', methods=['GET'])
def get_all_patients():
    try:
        query = sa.select(User).where(User.role == 'patient').order_by(User.first_name)
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)

        return User.to_collection_dict(query, page, per_page, 'user.get_all_patients')
    except Exception as e:
        print(f"Error while fetching all patients: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/doctors', methods=['GET'])
def get_all_doctors():
    try:
        query = sa.select(User).where(User.role == 'doctor').order_by(User.first_name)
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', 10, type=int), 100)

        return User.to_collection_dict(query, page, per_page, 'user.get_all_doctors')
    except Exception as e:
        print(f"Error while fetching all doctors: {e}")
        return jsonify({ "error": "Internal Server Error" }), 500

@user_bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
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

@user_bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
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