from flask import Blueprint

nlp_bp = Blueprint('nlp', __name__)

from api.nlp import routes