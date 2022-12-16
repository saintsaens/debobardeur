from . import main

from flask import (
    Blueprint, flash, render_template, request
)

bp = Blueprint('corrections', __name__)


@bp.route("/", methods=('GET', 'POST'))
def debobardize():
    if request.method == 'POST':
        text_with_bobards = request.form["text_with_bobards"]
        if text_with_bobards == "":
            flash("🎉")
        else:
            lines = text_with_bobards.splitlines()
            for x in lines:
                x = main.debobardeur(x)
                flash(x)

    return render_template("index.html")
