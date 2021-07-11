from app.auth import auth
from flask import render_template, redirect, url_for, request, flash
from flask_login import login_required, logout_user, login_user
from .forms import LoginForm, RegisterForm
from ..models import User


@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and user.verify_password(form.password.data):
            login_user(user, form.remember_me.data)
            next = request.args.get("next")
            if next is None or not next.startswith("/"):
                next = url_for('main.index')
            return redirect(next)

        flash('Email ou Senha inválida.')

    return render_template("auth/login.html", form=form)

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))


@auth.route("/register")
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        pass
    return render_template("auth/register.html", form=form)