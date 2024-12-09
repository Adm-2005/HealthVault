from flask import Blueprint

ac_bp = Blueprint('access_package', __name__)

from api.access_package import routes, utils