from flask import Blueprint, request,jsonify
from http import HTTPStatus
from src.models.player import Player
from flask_jwt_extended import jwt_required,get_jwt_identity
from app import db

if 'players' not in db.list_collection_names():
    db.create_collection('players')

collection_players = db['players']

players = Blueprint("players",__name__,url_prefix="/api/v1/admin/players")

@players.route('/', methods=['GET', 'POST'])
@jwt_required()
def functions_player():
    if request.method == 'POST':
        try:
            document = request.json.get('document')
            type_document = request.json.get('type_document')
            name = request.json.get('name')
            lastname = request.json.get('lastname')
            department = request.json.get('department')
            city = request.json.get('city')
            age = request.json.get('age')

            player = Player(document, type_document, name, lastname, department, city, age,collection_players)

            result = collection_players.insert_one(player.toDBCollection())

            response = {
                'document': document,
                'type_document': type_document,
                'name': name,
                'lastname': lastname,
                'department': department,
                'city': city,
                'age': age
            }
        except Exception as e:
            return jsonify({'error': 'Error al crear el estudiante', 'message': str(e)}), HTTPStatus.BAD_REQUEST

        return jsonify(response), HTTPStatus.CREATED
    elif request.method == 'GET':
        players_find = collection_players.find()
        players_list = []

        for player in players_find:
            players_list.append({
                'document':player['document'],
                'type_document':player['type_document'],
                'name':player['name'],
                'lastname':player['lastname'],
                'department':player['department'],
                'city': player['city'],
                'age': player['age']
            })

    return jsonify(players_list)


@players.route('/<document>', methods=['GET', 'PUT','DELETE'])
@jwt_required()
def funct_player(document):
    if request.method == 'GET':
        player_find = collection_players.find_one({'document':document})
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
    elif request.method == 'PUT':
        try:
            player_put = collection_players.find_one({'document': document})
            if not player_put:
                return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

            type_document = request.json.get('type_document', player_put['type_document'])
            name = request.json.get('name', player_put['name'])
            lastname = request.json.get('lastname', player_put['lastname'])
            department = request.json.get('department', player_put['department'])
            city = request.json.get('city', player_put['city'])
            age = request.json.get('age', player_put['age'])
            player = Player(document, type_document, name, lastname, department, city, age,collection_players).toDBCollection()
            collection_players.update_one(
                {'document': document},
                {'$set': {'document':document,'name':name,'lastname':lastname,'type_document':type_document,'department':department,'city':city,'age':age}}
            )

            response = {
                'document': document,
                'type_document': type_document,
                'name': name,
                'lastname': lastname,
                'department': department,
                'city': city,
                'age': age
            }

        except Exception as e:
            return jsonify({'error': 'Error al crear el estudiante', 'message': str(e)}), HTTPStatus.BAD_REQUEST

        return jsonify(response), HTTPStatus.OK
    elif request.method == 'DELETE':
        player = collection_players.find_one({'document': document})
        if not player:
            return {"error": "Player not found"}, HTTPStatus.NOT_FOUND

        # Actualizar el campo de estado para desactivar el administrador
        collection_players.update_one({'document': document}, {'$set': {'active': False}})

        return {"message": "Student deactivated"}, HTTPStatus.OK
