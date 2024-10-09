import sqlalchemy as sa
from flask import request, url_for

from app import db
from app.models import User
from app.api import bp
from app.api.errors import bad_request

@bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    return db.get_or_404(User, id).to_dict()

@bp.route('/users', methods=['GET'])
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    return User.to_collection_dict(sa.select(User), page, per_page, 'api.get_users')

@bp.route('/users', methods=['POST'])
def create_users():
    data = request.get_json()

    if 'username' not in data or 'email' not in data or 'role' not in data or 'password' not in data:
        return bad_request("Must include username, email, role and password fields.")
    if db.session.scalar(sa.select(User).where(User.username == data['username'])):
        return bad_request("Username already exists.")
    if db.session.scalar(sa.select(User).where(User.email == data['email'])):
        return bad_request("Email Address already exists.")
    
    user = User()
    user.from_dict(data)
    db.session.add(user)
    db.session.commit()

    return user.to_dict(), 201, {'Location': url_for('api.users.get_user', id=user.id)}

@bp.route('/users/<int:id>', methods=['PUT'])
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

@bp.route('/users/<int:id>', methods=['DELETE'])
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