from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config[
    'MONGO_URI'] = 'mongodb+srv://admin:smrpoadmin@clustertest.ef9bm.mongodb.net/testdb?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE'
mongo = PyMongo(app)


@app.route('/')
def test_api():
    return "api works"


@app.route('/users/add', methods=['POST'])
def add_user():
    username = request.json['username']
    password = request.json['password']

    if username and password:
        id = mongo.db.users.insert(
            {'username': username,
             'password': password}
        )
        response = {
            '_id': str(id),
            'username': username,
            'password': password
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


@app.route('/users/delete', methods=['DELETE'])
def delete_user():
    print(request.json['_id'])
    _id = request.json['_id']
    mongo.db.users.delete_one({'_id': ObjectId(_id)})
    return "deleted"


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