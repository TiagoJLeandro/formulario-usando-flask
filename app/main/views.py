from app.main import main
from flask_login import login_required
from flask import render_template


@main.route("/", methods=['GET'])
@login_required
def index():
    return render_template("main/main.html")
