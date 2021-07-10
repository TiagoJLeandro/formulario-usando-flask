from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from . import db, login_manager


class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    password_hash = db.Column(db.String)
    email = db.Column(db.String(128), unique=True, nullable=False)
    enable = db.Column(db.Boolean, default=False, nullable=True)
    address = db.relationship('Address', backref='users', lazy=True)

    @property
    def password(self):
        raise AttributeError("Password is not reable.")
    
    @password.setter
    def password(self, password) -> None:
        self.password_hash = generate_password_hash(password)
        return
    
    def verify_password(self, password) -> bool:
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f"User(Id: {self.id}, Name: {self.name}, " \
               f"Email: {self.email}, Enable: {self.enable})"


class Address(db.Model):
    __tablename__ = "address"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        primary_key=True
    )
    cep = db.Column(db.String(8), nullable=True)
    rua = db.Column(db.String(128), nullable=True)
    bairro = db.Column(db.String(128), nullable=True)
    cidade = db.Column(db.String(128), nullable=True)
    uf = db.Column(db.String(2), nullable=True)

    def __repr__(self):
        return f"Address(User_id: {self.user_id}, CEP: {self.cep}, " \
               f"Rua: {self.rua}, Bairro: {self.bairro}, " \
               f"Cidade: {self.cidade}, UF: {self.uf})"


@login_manager.user_loader
def loader_user(user_id):
    return User.query.get(int(user_id))
