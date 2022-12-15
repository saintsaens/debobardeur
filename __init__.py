from flask import Flask
from flask import render_template


app = Flask(__name__)


@app.route("/")
def debobardeur_form():
    return render_template("base.html")
