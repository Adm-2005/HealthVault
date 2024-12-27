from dotenv import load_dotenv
from api import create_app
from api.config import Config

load_dotenv()

app = create_app(Config)