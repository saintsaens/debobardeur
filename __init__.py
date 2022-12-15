from flask import Flask, render_template


def create_app():
    app = Flask(__name__)
    app.secret_key = "38a835526880f08e47b457a5e87d768f6a5ac32a1f2ab408d6fd0ef3ac10c181"

    from . import corrections
    app.register_blueprint(corrections.bp)

    return app
