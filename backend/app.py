from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from db import mongo
import os
from dotenv import load_dotenv
from routes.project import projects_route
from routes.cards import cards_route
from routes.scrums import scrums_route
from routes.sprints import sprints_route
from routes.users import users_route
load_dotenv()

app = Flask(__name__, static_folder='../ScrumTracker/dist/spa/',    static_url_path='/')
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['MONGO_URI'] = 'mongodb+srv://admin:smrpoadmin@clustertest.ef9bm.mongodb.net/testdb?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE'
mongo.init_app(app)
bcrypt = Bcrypt(app)

app.register_blueprint(projects_route)
app.register_blueprint(users_route)
app.register_blueprint(scrums_route)
app.register_blueprint(sprints_route)
app.register_blueprint(cards_route)


# Set up the index route
@app.route('/')
def index():
    # return "Hello World"
    return app.send_static_file('index.html')


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)
