import sqlalchemy as sa
from flask import request, url_for

from api import db
from api.models import User
from api.user import user_bp
from api.errors import bad_request

@user_bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    return db.get_or_404(User, id).to_dict()

@user_bp.route('/users', methods=['GET'])
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    return User.to_collection_dict(sa.select(User), page, per_page, 'api.get_users')

@user_bp.route('/users/<int:id>', methods=['PUT'])
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

        return user.to_dict()
    
    except Exception as e:
        return {"error": str(e)}, 500

@user_bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        query = sa.delete(User).where(User.id == id)
        row = db.session.execute(query).scalar_one_or_none

        if row is None:
            return {"error": "User not found"}, 404
            
        db.session.delete(row)    
        db.session.commit()

        return "", 204
    
    except Exception as e:
        return {"error": str(e)}, 500