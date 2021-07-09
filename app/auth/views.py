from app.auth import auth
from flask import render_template, redirect, url_for
from flask_login import login_required, logout_user
from .forms import LoginForm


@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        return redirect('main.index')

    return render_template("auth/login.html", form=form)

@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))
    