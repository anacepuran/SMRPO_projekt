from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from backend.db import mongo

projects_route = Blueprint('projects_route', __name__)


@projects_route.route('/projects/add', methods=['POST'])
def add_projects():
    name = request.json['name']
    users = request.json['users']
    description = request.json['description']
    documentation = ''
    wall = []

    project_id = mongo.db.projects.insert(
        {'name': name,
         'users': users,
         'description': description,
         'documentation': documentation,
         'wall': wall
         })
    response = {
        '_id': str(project_id),
        'name': name,
        'users': users,
        'description': description,
        'documentation': documentation,
        'wall': wall
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
    print(request.json)
    name = request.json['name']
    users = request.json['users']
    project_id = request.json['_id']
    description = request.json['description']
    documentation = request.json['documentation']
    wall = request.json['wall']

    project = mongo.db.projects.find_one({'_id': ObjectId(project_id)})
    project['name'] = name
    project['users'] = users
    project['description'] = description
    project['documentation'] = documentation
    project['wall'] = wall

    mongo.db.projects.save(project)
    response = {
        '_id': str(project_id),
        'name': name,
        'users': users,
        'description': description,
        'documentation': documentation,
        'wall': wall
    }
    return response, 200
