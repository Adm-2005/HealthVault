from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from api import db
from api.models import User

def roles_required(*roles):
    """Decorator that restricts access to a route based on user role."""
    def decorator(fn):
        @wraps
        def wrapper(*args, **kwargs):
            
            try:
                verify_jwt_in_request()
            except Exception as e:
                print(f"Error due to roles_required decorator: {e}")
                return jsonify({ "error": "Invalid or missing JWT!" }), 401

            current_user_id = get_jwt_identity()
            user = db.get_or_404(User, current_user_id)

            if user.role not in roles:
                return jsonify({ "error": "Unauthorized access." }), 403
            
            return fn(*args, **kwargs)
        return wrapper
    return decorator
