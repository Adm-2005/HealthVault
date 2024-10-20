import os 
from dotenv import load_dotenv

base_dir = os.path.abspath(os.path.dirname(__file__))

load_dotenv(dotenv_path=os.path.join(base_dir, '.env'))

class Config:
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = 3600 # 1 Hour
    JWT_REFRESH_TOKEN_EXPIRES = 86400 # 1 Day
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URL')
    HR_DIR = os.path.join(base_dir, 'uploads', 'health_records')
    QR_DIR = os.path.join(base_dir, 'uploads', 'qrcodes')
    MAX_FILE_SIZE = 16 * 1024 * 1024
    ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'doc', 'docx', 'png']