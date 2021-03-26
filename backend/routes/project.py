from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from db import mongo

projects_route = Blueprint('projects_route', __name__)


@projects_route.route('/projects/add', methods=['POST'])
def add_projects():
    name = request.json['name']
    users = request.json['users']
    description = request.json['description']

    project_id = mongo.db.projects.insert(
        {'name': name,
         'users': users,
         'description': description
         })
    response = {
        '_id': str(project_id),
        'name': name,
        'users': users,
        'description': description
    }
    print(response)
    return response


@projects_route.route('/projects/get', methods=['GET'])
def get_projects():
    projects = {}
    data = mongo.db.projects.find()

    for d in data:
        key = str(d["_id"])
        a = d.copy()
        a["_id"] = key
        projects[key] = a
    print(projects)
    return projects


@projects_route.route('/projects/delete', methods=['DELETE'])
def delete_project():
    project_id = request.json['_id']
    mongo.db.projects.delete_one({'_id': ObjectId(project_id)})
    return "Deleted " + project_id


@projects_route.route('/projects/update', methods=['PUT'])
def update_project():
    name = request.json['name']
    users = request.json['users']
    project_id = request.json['_id']
    description = request.json['description']

    project = mongo.db.projects.find_one({'_id': ObjectId(project_id)})
    project['name'] = name
    project['users'] = users
    project['description'] = description

    mongo.db.projects.save(project)
    response = {
        '_id': str(project_id),
        'name': name,
        'users': users,
        'description': description
    }
    return response, 200
