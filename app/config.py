from os import environ
from os.path import abspath, dirname, join


basedir = abspath(dirname(__file__))


class Config:
    SECRET_KEY = environ.get("SECRET_KEY", "123456")
    MAIL_SERVER = environ.get("MAIL_SERVER", "smtp.googlemail.com")
    MAIL_PORT = environ.get("MAIL_PORT", "587")
    MAIL_USE_TLS = environ.get("MAIL_USE_TLS", "true").lower() in \
        ["true", "on", "1"]
    MAIL_USER_NAME = environ.get("MAIL_USER_NAME")
    MAIL_PASSWORD = environ.get("MAIL_PASSWORD")
    SSL_REDIRECT = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    ENV = "development"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = environ.get(
        "DEV_DB", f"sqlite:///{join(basedir, 'dev-db.sqlite')}"
    )


class ProductionConfig(Config):
    ENV = 'production'
    SQLALCHEMY_DATABASE_URI = environ.get("PROD_DB")


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
