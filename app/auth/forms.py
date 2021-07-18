from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import DataRequired, EqualTo, Email, Length


class LoginForm(FlaskForm):
    email = StringField(validators=[DataRequired(), Email(), Length(max=128)])
    password = PasswordField(
        validators=[
            DataRequired(),
            Length(3, 20)
        ]
    )
    remember_me = BooleanField()


class RegisterForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(4, 128)])
    email = StringField(validators=[DataRequired(), Email(), Length(max=128)])
    password = PasswordField(
        validators=[
            DataRequired(),
            Length(5, 20),
            EqualTo(
                fieldname="password2",
                message="As senhas precisam ser identicas."
            )
        ]
    )
    password2 = PasswordField(validators=[DataRequired()])
    cep = StringField(validators=[DataRequired(), Length(8, 10)])
    rua = StringField(validators=[DataRequired(), Length(max=128)])
    bairro = StringField(validators=[DataRequired(), Length(max=128)])
    cidade = StringField(validators=[DataRequired(), Length(max=128)])
    uf = StringField(validators=[DataRequired(), Length(2)])
