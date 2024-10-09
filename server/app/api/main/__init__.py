from flask import Blueprint

bp = Blueprint('main', __name__)

from app.api.main import records, access