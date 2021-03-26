from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from db import mongo

sprints_route = Blueprint('sprints_route', __name__)


@sprints_route.route('/sprints/add', methods=['POST'])
def add_sprint():
    name = request.json['name']
    project_id = request.json['project_id']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    expected_time = request.json['expected_time']

    sprint_id = mongo.db.sprints.insert(
        {'project_id': project_id,
         'name': name,
         'start_date': start_date,
         'end_date': end_date,
         'expected_time': expected_time
         })
    response = {
        '_id': str(sprint_id),
        'name': name,
        'project_id': project_id,
        'start_date': start_date,
        'end_date': end_date,
        'expected_time': expected_time
    }
    print(response)
    return response


@sprints_route.route('/sprints/get', methods=['GET'])
def get_sprints():
    sprints = {}
    data = mongo.db.sprints.find()

    for d in data:
        key = str(d["_id"])
        a = d.copy()
        a["_id"] = key
        sprints[key] = a
    print(sprints)
    return sprints


@sprints_route.route('/sprints/delete', methods=['DELETE'])
def delete_sprints():
    sprint_id = request.json['_id']
    mongo.db.sprints.delete_one({'_id': ObjectId(sprint_id)})
    return "Deleted " + sprint_id


@sprints_route.route('/sprints/update', methods=['PUT'])
def update_sprints():
    name = request.json['name']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    expected_time = request.json['expected_time']
    sprint_id = request.json['_id']

    sprint = mongo.db.sprints.find_one({'_id': ObjectId(sprint_id)})
    sprint['name'] = name
    sprint['start_date'] = start_date
    sprint['end_date'] = end_date
    sprint['expected_time'] = expected_time

    mongo.db.sprints.save(sprint)
    response = {
        '_id': str(sprint_id),
        'name': name,
        'start_date': start_date,
        'end_date': end_date,
        'expected_time': expected_time
    }
    return response
