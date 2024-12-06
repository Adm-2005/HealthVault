from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

from api.models import User

def roles_required(*roles):
    """Decorator that restricts access to a route based on user role."""
    def decorator(fn):
        @wraps
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)

            if not user:
                return {"error": "User not found."}, 404
            if user.role not in roles:
                return {"Unauthorized access."}, 403
            
            return fn(*args, **kwargs)
        return wrapper
    return decorator
