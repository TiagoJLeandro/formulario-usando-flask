from werkzeug.security import generate_password_hash, check_password_hash
from . import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    password_hash = db.Column(db.String)
    enable = db.Column(db.Boolean, default=False)

    @property
    def password(self):
        raise AttributeError("Password is not reable.")
    
    @password.setter
    def password(self, password) -> None:
        self.password_hash = generate_password_hash(password)
        return
    
    def verify_password(self, password) -> bool:
        return check_password_hash(self.password_hash, password)