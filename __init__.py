from flask import Flask, render_template, flash, redirect, url_for


app = Flask(__name__)
app.secret_key = "38a835526880f08e47b457a5e87d768f6a5ac32a1f2ab408d6fd0ef3ac10c181"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/debobarded")
def debobarded():
    flash('Texte débobardé. 🎉')
    return redirect(url_for('index'))
