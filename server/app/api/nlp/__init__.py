from flask import Blueprint

bp = Blueprint('nlp', __name__)

from app.api.nlp import routes