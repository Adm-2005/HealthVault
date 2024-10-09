# package/library imports
import sqlalchemy as sa
from flask import request, url_for

# application imports
from app.models import HealthRecord, AccessControl
from app.api.nlp import bp

@bp.route('/')
def generate_summary():
    pass