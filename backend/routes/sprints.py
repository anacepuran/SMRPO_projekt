from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from db import mongo

sprints_route = Blueprint('sprints_route', __name__)