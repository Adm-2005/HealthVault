from flask import Blueprint

ac_bp = Blueprint('access_control', __name__)

from api.access_control import routes, utils