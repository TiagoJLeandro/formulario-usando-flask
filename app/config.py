from os import environ
from os.path import abspath, dirname, join


basedir = abspath(dirname(__file__))


class Config:
    SECRET_KEY = environ.get("SECRET_KEY")
    MAIL_SERVER = environ.get("MAIL_SERVER", "smtp.googlemail.com")
    MAIL_PORT = environ.get("MAIL_PORT", "587")
    MAIL_USE_TLS = environ.get("MAIL_USE_TLS", "true").lower() in \
        ["true", "on", "1"]
    SSL_REDIRECT = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevConfig(Config):
    ENV = "development"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = environ.get(
        "DEV_DB", f"sqlite:///{join(basedir, 'dev-db.sqlite')}"
    )


class ProdConfig(Config):
    ENV = 'production'
    SQLALCHEMY_DATABASE_URI = environ.get("PROD_DB")


config = {
    'dev': DevConfig,
    'prod': ProdConfig,
    'default': DevConfig
}
