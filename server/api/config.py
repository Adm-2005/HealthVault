import os 
from dotenv import load_dotenv

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

load_dotenv(dotenv_path=os.path.join(base_dir, '.env'))

class Config:
    # connection urls and testing
    CLIENT_URL = os.environ.get('CLIENT_URL')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URL')
    TESTING = os.environ.get('TESTING').lower() in ['true', 'yes']

    # flask jwt extended config
    JWT_TOKEN_LOCATION = 'cookies'
    JWT_ACCESS_TOKEN_EXPIRES = 86400 # 1 day
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_COOKIE_SAMESITE = os.environ.get('JWT_COOKIE_SAMESITE')
    JWT_ACCESS_CSRF_COOKIE_NAME = os.environ.get('JWT_ACCESS_CSRF_COOKIE_NAME')
    JWT_COOKIE_SECURE = os.environ.get('JWT_COOKIE_SECURE').lower() in ['true', 'yes']
    JWT_CSRF_IN_COOKIES = os.environ.get('JWT_CSRF_IN_COOKIES').lower() in ['true', 'yes']

    # application config
    MAX_FILE_SIZE = 16 * 1024 * 1024 # 16 mb
    QR_DIR = os.path.join(base_dir, 'uploads', 'qrcodes')
    AVATAR_DIR = os.path.join(base_dir, 'uploads', 'avatars')
    HR_DIR = os.path.join(base_dir, 'uploads', 'health_records')
    ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'doc', 'docx', 'png']