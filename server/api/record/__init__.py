from flask import Blueprint

hr_bp = Blueprint('record', __name__)

from api.record import routes, utils