from flask import request, jsonify
from bson.objectid import ObjectId
from flask import Blueprint
from db import mongo

cards_route = Blueprint('cards_route', __name__)


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
