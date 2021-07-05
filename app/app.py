from os import environ
from . import create_app, db
from .models import User, Address


config_name = environ.get("APP_CONFIG", "default")
app = create_app(config_name)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, user=User, address=Address)
    