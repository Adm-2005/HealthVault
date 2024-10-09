# package/library imports
from flask import Flask, current_app 
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

# application imports
from config import Config


db = SQLAlchemy()
login = LoginManager()
migrate = Migrate()

def create_app(config_class=Config):
    """Create app and initialize all extensions"""
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)

    # blueprint imports
    from app.api import bp as api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app

from app import models