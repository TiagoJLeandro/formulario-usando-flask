from app.auth import auth
from flask import render_template, redirect
from .forms import LoginForm


@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        return redirect('main.index')

    return render_template("auth/login.html", form=form)
    