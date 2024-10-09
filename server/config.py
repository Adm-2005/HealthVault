import os 
from dotenv import load_dotenv

base_dir = os.path.abspath(os.path.dirname(__file__))

load_dotenv(os.path.join(base_dir, '.env'))

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URL')