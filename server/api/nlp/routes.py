# package/library imports
import sqlalchemy as sa
from flask import request, url_for

# application imports
from api.models import HealthRecord, AccessControl
from api.nlp import nlp_bp

@nlp_bp.route('/')
def generate_summary():
    pass