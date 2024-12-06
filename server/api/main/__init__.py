from flask import Blueprint

main_bp = Blueprint('main', __name__)

from api.main import records, access, utils