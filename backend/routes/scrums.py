from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from db import mongo

scrums_route = Blueprint('scrums_route', __name__)


@scrums_route.route('/scrums/get', methods=['GET'])
def get_scrums():
    scrums = {}
    data = mongo.db.scrums.find()

    for d in data:
        key = str(d["_id"])
        a = d.copy()
        a["_id"] = key
        scrums[key] = a
    print(scrums)
    return scrums