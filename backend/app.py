from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from auxiliary_functions import *


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['MONGO_URI'] = 'mongodb+srv://admin:smrpoadmin@clustertest.ef9bm.mongodb.net/testdb?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)


@app.route('/')
def test_api():
    return "api works"


""" USER LOGIN """
@app.route('/users/authenticate', methods=['POST'])
def user_authenticate():
    username = request.json['username']
    password = request.json['password']
    print(username + ' ' + password)

    if username and password:
        user = mongo.db.users.find_one({'username': username})
        if user:
            if check_password(user['password'], password):
                print(user)
                response = {
                    'name': user['name'],
                    'surname': user['surname'],
                    'email': user['email'],
                    'username': user['username'],
                    'permissions': user['permissions'],
                    'last_login': date_time(),
                    '_id': str(user['_id'])
                }
                return response, 200
            else:
                print('password mismatch')
                return {'error': 'Password invalid.'}, 401
        else:
            print('no user')
            return {'error': 'User does not exist.'}, 401
    else:
        print('us + pass')
        return {'error': 'Please provide username and password.'}, 401


""" USERS """
@app.route('/users/add', methods=['POST'])
def add_user():
    name = request.json['name']
    surname = request.json['surname']
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    permissions = request.json['permissions']

    if username and password:
        user_id = mongo.db.users.insert(
            {'name': name,
             'surname': surname,
             'email': email,
             'username': username,
             'password': hash_password(password),
             'permissions': permissions}
        )
        response = {
            '_id': str(user_id),
            'name': name,
            'surname': surname,
            'email': email,
            'username': username,
            'permissions': permissions
        }
        print(response)
        return response
    else:
        return jsonify('Error')


@app.route('/users/get', methods=['GET'])
def get_user():
    obj = {}
    data = mongo.db.users.find()

    for o in data:
        key = str(o["_id"])
        a = o.copy()
        a["_id"] = key
        obj[key] = a
    print(obj)
    return obj


@app.route('/users/update', methods=['POST'])
def update_user():
    print(request.json)
    name = request.json['name']
    surname = request.json['surname']
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    permissions = request.json['permissions']
    last_login = request.json['last_login']
    user_id = request.json['_id']
    print(user_id)
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    print(user)
    user['name'] = name
    user['surname'] = surname
    user['email'] = email
    user['username'] = username
    user['last_login'] = last_login
    if permissions != '':
        user['permissions'] = permissions
    if password != '':
        print('change password')
        user['password'] = hash_password(password)
    mongo.db.users.save(user)
    response = {
        '_id': str(user_id),
        'name': name,
        'surname': surname,
        'email': email,
        'username': username,
        'permissions': permissions,
        'last_login': last_login
    }
    return response, 200


@app.route('/users/delete', methods=['DELETE'])
def delete_user():
    print(request.json['_id'])
    user_id = request.json['_id']
    mongo.db.users.delete_one({'_id': ObjectId(user_id)})
    return "deleted"


""" PROJECTS """
@app.route('/projects/get', methods=['GET'])
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


@app.route('/projects/add', methods=['POST'])
def add_projects():
    name = request.json['name']
    users = request.json['users']

    if name and users:
        project_id = mongo.db.projects.insert(
            {'name': name,
             'users': users
            })
        response = {
            '_id': str(project_id),
            'name': name,
            'users': users,
        }
        print(response)
        return response
    else:
        return jsonify('Error')


@app.route('/projects/delete', methods=['DELETE'])
def delete_project():
    project_id = request.json['_id']
    mongo.db.projects.delete_one({'_id': ObjectId(project_id)})
    return "Deleted " + project_id



""" CARDS """
@app.route('/cards/get', methods=['GET'])
def get_cards():
    cards = {}
    data = mongo.db.cards.find()

    for d in data:
        key = str(d["_id"])
        a = d.copy()
        a["_id"] = key
        cards[key] = a
    print(cards)
    return cards



""" SCRUMS """
@app.route('/scrums/get', methods=['GET'])
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



if __name__ == '__main__':
    app.run()
