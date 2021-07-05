from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, EqualTo, Email, Length


class RegisterForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(min=4, max=128)])
    email = StringField(validators=[DataRequired(), Email(max=128)])
    password = PasswordField(
        validators=[
            DataRequired(),
            EqualTo(
                fieldname="password2",
                message="As senhas precisam ser identicas."
            ),
            Length(min=5, max=20)
        ]
    )
    password2 = PasswordField(validators=[DataRequired()])
    cep = StringField(validators=[DataRequired(), Length(min=9, max=9)])
    rua = StringField(validators=[DataRequired(), Length(max=128)])
    bairro = StringField(validators=[DataRequired(), Length(max=128)])
    cidade = StringField(validators=[DataRequired(), Length(max=128)])
    uf = StringField(validators=[DataRequired(), Length(min=2, max=2)])
