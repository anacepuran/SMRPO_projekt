from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from db import mongo

cards_route = Blueprint('cards_route', __name__)


@cards_route.route('/cards/add', methods=['POST'])
def add_card():
    sprint_id = request.json['sprint_id']
    project_id = request.json['project_id']
    card_name = request.json['card_name']
    description = request.json['description']
    acceptance_test = request.json['acceptance_test']
    priority = request.json['priority']
    value = request.json['value']
    subtasks = request.json['subtasks']
    card_round = request.json['card_round']

    card_id = mongo.db.cards.insert(
        {'sprint_id': sprint_id,
            'project_id': project_id,
            'card_name': card_name,
            'description': description,
            'priority': priority,
            'acceptance_test': acceptance_test,
            'value': value,
            'card_round': card_round,
            'subtasks': subtasks
         })
    response = {
        '_id': str(card_id),
        'sprint_id': str(sprint_id),
        'project_id': str(project_id),
        'card_name': card_name,
        'description': description,
        'priority': priority,
        'acceptance_test': acceptance_test,
        'value': value,
        'card_round': card_round,
        'subtasks': subtasks
    }
    print(response)
    return response


@cards_route.route('/cards/get', methods=['GET'])
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


@cards_route.route('/cards/delete', methods=['DELETE'])
def delete_cards():
    card_id = request.json['_id']
    mongo.db.sprints.delete_one({'_id': ObjectId(card_id)})
    return "Deleted " + card_id


@cards_route.route('/cards/update', methods=['PUT'])
def update_sprint_of_card():
    sprint_id = request.json['sprint_id']
    project_id = request.json['project_id']
    card_id = request.json['_id']
    description = request.json['description']
    acceptance_test = request.json['acceptance_test']
    priority = request.json['priority']
    value = request.json['value']
    subtasks = request.json['subtasks']
    card_round = request.json['card_round']
    
    current_card = mongo.db.cards.find_one({'_id': ObjectId(card_id)})
    current_card['sprint_id'] = sprint_id
    current_card['project_id'] = project_id
    current_card['description'] = description
    current_card['acceptance_test'] = acceptance_test
    current_card['priority'] = priority
    current_card['value'] = value
    current_card['subtasks'] = subtasks
    current_card['card_round'] = card_round

    mongo.db.cards.save(current_card)
    response = {
        '_id': str(card_id),
        'project_id': str(project_id),
        'sprint_id': str(sprint_id),
        'card_name': current_card['card_name'],
        'description': current_card['description'],
        'priority': current_card['priority'],
        'acceptance_test': current_card['acceptance_test'],
        'value': current_card['value'],
        'subtasks': current_card['subtasks'],
        'card_round': current_card['card_round']
    }
    return response, 200
