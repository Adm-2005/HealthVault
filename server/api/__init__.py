from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from werkzeug.exceptions import HTTPException

from api.config import Config
from api.errors import handle_exception

db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_error_handler(HTTPException, handle_exception)

    # importing inside the function to avoid circular imports
    from api.auth import auth_bp
    from api.main import main_bp
    from api.nlp import nlp_bp
    from api.user import user_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(main_bp, url_prefix='/main')
    app.register_blueprint(nlp_bp, url_prefix='/nlp')
    app.register_blueprint(user_bp, url_prefix='/user')

    return app