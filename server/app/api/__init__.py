from flask import Blueprint

bp = Blueprint('api', __name__)

from app.api.auth import bp as auth_bp
from app.api.nlp import bp as nlp_bp
from app.api.main import bp as main_bp

bp.register_blueprint(auth_bp, url_prefix='/auth')
bp.register_blueprint(nlp_bp, url_prefix='/nlp')
bp.register_blueprint(main_bp, url_prefix='/main')

from app.api import users