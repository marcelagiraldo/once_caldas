from database import db_connection
from flask import Blueprint, request,jsonify
from http import HTTPStatus

from models.player import Player

db = db_connection()

collection_player = db.players

players = Blueprint("players",__name__,url_prefix="/api/v1/players")

@players.post('/')
def created_player():
    try:
        document = request.json.get('document')
        type_document = request.json.get('type_document')
        name = request.json.get('name')
        lastname = request.json.get('lastname')
        department = request.json.get('department')
        city = request.json.get('city')
        age = request.json.get('age')

        player = Player(document, type_document, name, lastname, department, city, age)

        result = collection_player.insert_one(player.toDBCollection())
        inserted_id = result.inserted_id

        # Obtener el estudiante insertado
        inserted_player = collection_player.find_one({'_id': inserted_id})

        response = {
            'document': inserted_player['document'],
            'type_document': inserted_player['type_document'],
            'name': inserted_player['name'],
            'lastname': inserted_player['lastname'],
            'department': inserted_player['department'],
            'city': inserted_player['city'],
            'age': inserted_player['age']
        }
    except Exception as e:
        return {'Error al crear el jugador'}, HTTPStatus.BAD_REQUEST

    return jsonify(response), HTTPStatus.CREATED

@players.get('/')
def get_players():
    players_find = collection_player.find()
    players_list = []

    for player in players_find:
        players_list.append({
            'document':player['document'],
            'type_document':player['type_document'],
            'name':player['name'],
            'lastname':player['lastname'],
            'department':player['department'],
            'city': player['player'],
            'age': player['age']
        })

    return jsonify(players_list)

@players.get('/<document_player>')
def get_player(document_player):
    player_find = collection_player.find_one({'document':document_player})
    if player_find:
        response = {
            'document':player_find['document'],
            'type_document':player_find['type_document'],
            'name':player_find['name'],
            'lastname':player_find['lastname'],
            'department':player_find['department'],
            'city':player_find['city'],
            'age':player_find['age']
        }
        return jsonify(response),HTTPStatus.OK
    else:
        return {"error":"Resource not found"}, HTTPStatus.NOT_FOUND
    
@players.put('/<document_player>')
def update_player(document_player):
    try:
        player_put = collection_player.find_one({'document': document_player})
        if not player_put:
            return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

        type_document = request.json.get('type_document', player_put['type_document'])
        name = request.json.get('name', player_put['name'])
        lastname = request.json.get('lastname', player_put['lastname']),
        department = request.json.get('department', player_put['department']),
        city = request.json.get('city', player_put['city']),
        age = request.json.get('age', player_put['age'])

        player_put = collection_player.update_one(
            {'document': document_player},
            {'$set': Player(document_player, type_document, name, lastname, department, city, age).toDBCollection()}
        )

        # Consultar el estudiante actualizado
        updated_player = collection_player.find_one({'document': document_player})

        response = {
            'document': updated_player['document'],
            'type_document': updated_player['type_document'],
            'name': updated_player['name'],
            'lastname': updated_player['lastname'],
            'department': updated_player['department'],
            'city': updated_player['city'],
            'age': updated_player['age']
        }

    except Exception as e:
        print('Error:', e)
        return 'El jugador no pudo ser actualizado', HTTPStatus.BAD_REQUEST

    return jsonify(response), HTTPStatus.OK

@players.delete('/<document_player>')
def delete_player(document_player):
    try:
        collection_player.delete_one({'document':document_player})
    except Exception as e:
        return print("Error al eliminar el jugador",e),HTTPStatus.BAD_REQUEST

    return "data:''",HTTPStatus.NO_CONTENT
