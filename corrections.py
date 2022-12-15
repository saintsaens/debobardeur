from . import main

from flask import (
    Blueprint, flash, render_template, request
)

bp = Blueprint('corrections', __name__, url_prefix='/corrections')


@bp.route("/debobardize", methods=('GET', 'POST'))
def debobardize():
    if request.method == 'POST':
        text_with_bobards = request.form["text_with_bobards"]
        text_without_bobards = main.debobardeur(text_with_bobards)
        flash(text_without_bobards)

    return render_template("index.html")
