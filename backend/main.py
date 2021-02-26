from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/')
def api():
    return 'api'


@app.route('/api')
def hello_world():
    return 'Hello, World!'
