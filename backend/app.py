from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['MONGO_URI'] = 'mongodb+srv://admin:smrpoadmin@clustertest.ef9bm.mongodb.net/testdb?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)


def hash_password(password):
    password = generate_password_hash(password).decode('utf8')
    return password


def check_password(password, password_hash):
    return check_password_hash(password, password_hash)


def date_time():
    # datetime object containing current date and time
    now = datetime.now()

    print("now =", now)

    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("date and time =", dt_string)

    return dt_string


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
                    'last_login': date_time()
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
    user_id = request.json['_id']
    print(user_id)
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    print(user)
    user['name'] = name
    user['surname'] = surname
    user['email'] = email
    user['username'] = username
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
        'permissions': permissions
    }
    return response, 200


@app.route('/users/delete', methods=['DELETE'])
def delete_user():
    print(request.json['_id'])
    user_id = request.json['_id']
    mongo.db.users.delete_one({'_id': ObjectId(user_id)})
    return "deleted"


""" PROJECTS """

""" CARDS """

""" SCRUMS """

if __name__ == '__main__':
    app.run()

'''
@app.route('/add', methods=['POST'])
def add_todo():
    new_todo = request.form.get('new-todo')
    todos.insert_one({'text' : new_todo, 'complete' : False})
    return redirect(url_for('index'))

@app.route('/complete/<oid>')
def complete(oid):
    todo_item = todos.find_one({'_id': ObjectId(oid)})
    todo_item['complete'] = True
    todos.save(todo_item)
    return redirect(url_for('index'))

@app.route('/delete_completed')
def delete_completed():
    todos.delete_many({'complete' : True})
    return redirect(url_for('index'))

@app.route('/delete_all')
def delete_all():
    todos.delete_many({})
    return redirect(url_for('index'))
'''