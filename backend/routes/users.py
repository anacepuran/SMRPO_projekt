from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from db import mongo
from auxiliary_functions import *

users_route = Blueprint('users_route', __name__)


""" USER LOGIN """
@users_route.route('/users/authenticate', methods=['POST'])
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


@users_route.route('/users/add', methods=['POST'])
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


@users_route.route('/users/get', methods=['GET'])
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


@users_route.route('/users/update', methods=['POST'])
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


@users_route.route('/users/delete', methods=['DELETE'])
def delete_user():
    print(request.json['_id'])
    user_id = request.json['_id']
    mongo.db.users.delete_one({'_id': ObjectId(user_id)})
    return "deleted"