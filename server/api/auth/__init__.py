from flask import Blueprint

auth_bp = Blueprint('auth', __name__)

from api.auth import routes, utils