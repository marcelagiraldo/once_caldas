from flask import Blueprint, request,jsonify
from http import HTTPStatus
from src.models.fevolution import Evolution
from flask_jwt_extended import jwt_required,get_jwt_identity
from app import db
from datetime import datetime
now = datetime.now()
datenow = now.strftime("%Y-%m-%d")
timenow = now.strftime('%H:%M')
print("datenow: ",datenow,"timenow: ",timenow)

if 'evolutions' not in db.list_collection_names():
    db.create_collection('evolutions')

collection_evolutions = db['evolutions']
collection_players = db['players']

evolutions = Blueprint("evolutions",__name__,url_prefix="/api/v1")

@evolutions.route('/evolutions', methods=['GET'])
@jwt_required()
def get_evolutions():
    evolutions_find = collection_evolutions.find()
    evolutions_list = []

    for evolution in evolutions_find:
        if evolution['active']==True:
            evolutions_list.append({
                'date' : evolution['date'],
                'time' : evolution['time'],
                'medical_diagnosis' : evolution['medical_diagnosis'],
                'full_name' : evolution['full_name'],
                'document' : evolution['document'],
                'date_birth' : evolution['date_birth'],
                'origin' : evolution['origin'],
                'eps' : evolution['eps'],
                'address' : evolution['address'],
                'phone' : evolution['phone'],
                'position' : evolution['position'],
                'time_linkage' : evolution['time_linkage'],
                'club_home' : evolution['club_home'],
                'additional_exercise' : evolution['additional_exercise'],
                'gender' : evolution['gender'],
                'day' : evolution['day'],
                'activity_type' : evolution['activity_type'],
                'observation' : evolution['observation'],
            })

    return jsonify(evolutions_list)

@evolutions.route('/<document>/evolutions', methods=['POST'])
@jwt_required()
def post_evolution(document):
    player = collection_players.find_one({'document':document})
    if request.method == 'POST':
        try:
            date = datenow
            time = timenow
            medical_diagnosis = request.json.get('medical_diagnosis')
            full_name = player['name']+' '+player['lastname']
            document_ = player['document']
            date_birth = request.json.get('date_birth')
            origin = request.json.get('origin')
            eps = request.json.get('eps')
            address = request.json.get('address')
            phone = request.json.get('phone')
            position = request.json.get('position')
            time_linkage = request.json.get('time_linkage')
            club_home = request.json.get('club_home')
            additional_exercise = request.json.get('additional_exercise')
            gender = request.json.get('gender')
            day = request.json.get('day')
            activity_type = request.json.get('activity_type')
            observation = request.json.get('observation')

            evolution = Evolution(
                date,time,medical_diagnosis,full_name,document_,date_birth,origin,
                eps,address,phone,position,time_linkage,club_home,additional_exercise
                ,gender,day,activity_type,observation)

            result = collection_evolutions.insert_one(evolution.toDBCollection())

            response = {
                'date' : date,
                'time' : time,
                'medical_diagnosis' : medical_diagnosis,
                'full_name' : full_name,
                'document' : document_,
                'date_birth' : date_birth,
                'origin' : origin,
                'eps' : eps,
                'address' : address,
                'phone' : phone,
                'position' : position,
                'time_linkage' : time_linkage,
                'club_home' : club_home,
                'additional_exercise' : additional_exercise,
                'gender' : gender,
                'day' : day,
                'activity_type' : activity_type,
                'observation' : observation,
            }
        except Exception as e:
            return jsonify({'error': 'Error al crear el estudiante', 'message': str(e)}), HTTPStatus.BAD_REQUEST

        return jsonify(response), HTTPStatus.CREATED

@evolutions.route('/players/<document_>/evolutions/<date_>', methods=['GET','DELETE'])
@jwt_required()
def get_evolution(date_,document_):
    evolution = collection_evolutions.find_one({'date':date_})
    player = collection_players.find_one({'document':document_})
    if evolution['document']==document_:
        if request.method == 'GET':
            response = {
                'date' : evolution['date'],
                'time' : evolution['time'],
                'medical_diagnosis' : evolution['medical_diagnosis'],
                'full_name' : evolution['full_name'],
                'document' : evolution['document'],
                'date_birth' : evolution['date_birth'],
                'origin' : evolution['origin'],
                'eps' : evolution['eps'],
                'address' : evolution['address'],
                'phone' : evolution['phone'],
                'position' : evolution['position'],
                'time_linkage' : evolution['time_linkage'],
                'club_home' : evolution['club_home'],
                'additional_exercise' : evolution['additional_exercise'],
                'gender' : evolution['gender'],
                'day' : evolution['day'],
                'activity_type' : evolution['activity_type'],
                'observation' : evolution['observation'],
            }

            return jsonify(response), HTTPStatus.CREATED
        elif request.method == 'DELETE':

            if not evolution:
                return {"error": "evolution not found"}, HTTPStatus.NOT_FOUND

            # Actualizar el campo de estado para desactivar el administrador
            collection_evolutions.update_one({'date': date_}, {'$set': {'active': False}})

            return {"message": "Evolution deactivated"}, HTTPStatus.OK
    else:
        return {"message": "Evolution no encontrado"}, HTTPStatus.BAD_REQUEST

@evolutions.route('/players/<docuemnt>/evolutions/<date>', methods=['PUT'])
@jwt_required()
def update_evolution(date_,document_):
    try:
        evolution_put = collection_evolutions.find_one({'date': date_})
        player = collection_players.find_one({'document':document_})
        if not evolution_put:
            return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

        date = datenow
        time = timenow
        medical_diagnosis = request.json.get('medical_diagnosis',evolution_put['medical_diagnosis'])
        full_name = player['name']+''+player['lastname']
        document = player['document']
        date_birth = request.json.get('date_birth',evolution_put['date_birth'])
        origin = request.json.get('origin',evolution_put['origin'])
        eps = request.json.get('eps',evolution_put['eps'])
        address = request.json.get('address',evolution_put['address'])
        phone = request.json.get('phone',evolution_put['phone'])
        position = request.json.get('position',evolution_put['position'])
        time_linkage = request.json.get('time_linkage',evolution_put['time_linkage'])
        club_home = request.json.get('club_home',evolution_put['club_home'])
        additional_exercise = request.json.get('additional_exercise',evolution_put['additional_exercise'])
        gender = request.json.get('gender',evolution_put['gender'])
        day = request.json.get('day',evolution_put['day'])
        activity_type = request.json.get('activity_type',evolution_put['activity_type'])
        observation = request.json.get('observation',evolution_put['observation'])

        evolution = Evolution(
            date,time,medical_diagnosis,full_name,document_,date_birth,origin,
            eps,address,phone,position,time_linkage,club_home,additional_exercise
            ,gender,day,activity_type,observation).toDBCollection()

        evolution_up = collection_evolutions.update_one(
            {'date': date_},
            {'$set': {'date' : date,
            'time' : time,
            'medical_diagnosis' : medical_diagnosis,
            'full_name' : full_name,
            'document' : document_,
            'date_birth' : date_birth,
            'origin' : origin,
            'eps' : eps,
            'address' : address,
            'phone' : phone,
            'position' : position,
            'time_linkage' : time_linkage,
            'club_home' : club_home,
            'additional_exercise' : additional_exercise,
            'gender' : gender,
            'day' : day,
            'activity_type' : activity_type,
            'observation' : observation}}
        )
        '''
        response = {
            'date' : date,
            'time' : time,
            'medical_diagnosis' : medical_diagnosis,
            'full_name' : full_name,
            'document' : document_,
            'date_birth' : date_birth,
            'origin' : origin,
            'eps' : eps,
            'address' : address,
            'phone' : phone,
            'position' : position,
            'time_linkage' : time_linkage,
            'club_home' : club_home,
            'additional_exercise' : additional_exercise,
            'gender' : gender,
            'day' : day,
            'activity_type' : activity_type,
            'observation' : observation
        } '''

    except Exception as e:
        return jsonify({'error': 'Error al crear el estudiante', 'message': str(e)}), HTTPStatus.BAD_REQUEST

    return jsonify(evolution_up), HTTPStatus.OK
'''
@evolutions.route('/<document>', methods=['GET', 'PUT','DELETE'])
@jwt_required()
def funct_evolution(document):
    if request.method == 'GET':
        evolution_find = collection_evolutions.find_one({'document':document})
        if evolution_find:
            response = {
                'document':evolution_find['document'],
                'type_document':evolution_find['type_document'],
                'name':evolution_find['name'],
                'lastname':evolution_find['lastname'],
                'department':evolution_find['department'],
                'city':evolution_find['city'],
                'age':evolution_find['age']
            }
            return jsonify(response),HTTPStatus.OK
        else:
            return {"error":"Resource not found"}, HTTPStatus.NOT_FOUND
    elif request.method == 'PUT':
        try:
            evolution_put = collection_evolutions.find_one({'document': document})
            if not evolution_put:
                return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

            type_document = request.json.get('type_document', evolution_put['type_document'])
            name = request.json.get('name', evolution_put['name'])
            lastname = request.json.get('lastname', evolution_put['lastname'])
            department = request.json.get('department', evolution_put['department'])
            city = request.json.get('city', evolution_put['city'])
            age = request.json.get('age', evolution_put['age'])
            evolution = evolution(document, type_document, name, lastname, department, city, age,collection_evolutions).toDBCollection()
            collection_evolutions.update_one(
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
        evolution = collection_evolutions.find_one({'document': document})
        if not evolution:
            return {"error": "evolution not found"}, HTTPStatus.NOT_FOUND

        # Actualizar el campo de estado para desactivar el administrador
        collection_evolutions.update_one({'document': document}, {'$set': {'active': False}})

        return {"message": "Student deactivated"}, HTTPStatus.OK
 '''
