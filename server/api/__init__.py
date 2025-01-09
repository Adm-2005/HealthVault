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

    CORS(
        app,
        origins = [app.config['CLIENT_URL']],
        supports_credentials=True
    )
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    app.register_error_handler(HTTPException, handle_exception)

    # importing inside the function to avoid circular imports
    from api.auth import auth_bp
    from api.nlp import nlp_bp
    from api.user import user_bp
    from api.record import hr_bp
    from api.access_package import ac_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(nlp_bp, url_prefix='/nlp')
    app.register_blueprint(hr_bp, url_prefix='/records')
    app.register_blueprint(user_bp, url_prefix='/users')
    app.register_blueprint(ac_bp, url_prefix='/packages')

    return app