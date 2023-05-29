from flask import Blueprint, request,jsonify
from http import HTTPStatus
from src.models.admin import Admin
from flask_jwt_extended import jwt_required,get_jwt_identity
import jwt
from bson import ObjectId
#from extensions import mongodb_client
from app import db

if 'admins' not in db.list_collection_names():
    db.create_collection('admins')

collection_admin = db['admins']

admins_blueprint = Blueprint("admins",__name__,url_prefix="/api/v1/admins")

@admins_blueprint.route('/', methods=['POST'])
def created_admin():
    try:
        name = request.json.get('name')
        lastname = request.json.get('lastname')
        email = request.json.get('email')
        password = request.json.get('password')
        repeat_password = request.json.get('repeat_password')
        admin = Admin(name, lastname, email, password, repeat_password,collection_admin)

        admin_data, error = admin.toDBCollection()
        if error:
            print("Error:", error)
        else:
            result = collection_admin.insert_one(admin_data)

        print('esto es result: ',result)

        inserted_id = result.inserted_id
        inserted_admin = collection_admin.find_one({'_id': inserted_id})
        response = {
            'name': inserted_admin['name'],
            'lastname': inserted_admin['lastname'],
            'email': inserted_admin['email'],
            'password': inserted_admin['password']
        }

    except Exception as e:
        return jsonify({'error': 'Error al crear el admin', 'message': str(e)}), HTTPStatus.BAD_REQUEST

    return jsonify(response), HTTPStatus.CREATED


@admins_blueprint.route('/todos', methods=['GET'])
def get_admins():
    admins_find = collection_admin.find()
    admins_list = []

    for admin in admins_find:
        admins_list.append({
            'name':admin['name'],
            'lastname':admin['lastname'],
            'email':admin['email'],
            'password':admin['password'],
        })

    return jsonify(admins_list)

@admins_blueprint.route('/me', methods=['GET'])
@jwt_required()
def get_admin_():
    #data = request.get_json()
    print("estoy aqui")
    id = get_jwt_identity()
    print(id)
    admin_find = collection_admin.find_one({'_id': ObjectId(id)})
    print(admin_find)
    #print(admin_find)
    #admins_list = []

    if admin_find:
            response = {
                'name': admin_find['name'],
                'lastname': admin_find['lastname'],
                'email': admin_find['email'],
                'password': admin_find['password'],
            }
            return jsonify(response), HTTPStatus.OK
    else:
        return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND




''' @admins_blueprint.route('/me', methods=['GET'])
#@jwt_required()
def protegido():
    token = request.headers.get('Authorization')
    print(token)
    if not token:
        return 'Token de autenticación faltante', 401

    try:
        # Decodificar el token JWT
        
        print(payload = jwt.decode(token, 'DEVELOPMENT_SECRET_KEY', algorithms=['HS256']))
        # Obtener los valores dentro del token
        email = payload['email']

        # Realizar alguna operación con los valores obtenidos
        # ...

        return f'Bienvenido, {email}'

    except jwt.ExpiredSignatureError:
        return 'Token expirado', 401
    except jwt.InvalidTokenError:
        return 'Token inválido', 401 '''


@admins_blueprint.route('/', methods=['GET','PUT'])
@jwt_required()
def get_admin():
    id = get_jwt_identity()
    print('email: ', id)
    admin_data = collection_admin.find_one({"_id": ObjectId(id)})
    print('admin_data: ', admin_data)
    if request.method == 'GET':
        admin_find = collection_admin.find_one({'email': admin_data['email']})
        if admin_find:
            response = {
                'name': admin_find['name'],
                'lastname': admin_find['lastname'],
                'email': admin_find['email'],
                'password': admin_find['password'],
            }
            return jsonify(response), HTTPStatus.OK
        else:
            return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND
    elif request.method == 'PUT':
        try:
            print("----------------------aqui toy-------------------")
            admin_put = collection_admin.find_one({"_id": ObjectId(id)})
            if not admin_put:
                return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

            name = request.json.get('name', admin_put['name'])
            print('name:',name)
            lastname = request.json.get('lastname', admin_put['lastname'])
            print('lastname:',lastname)
            email = request.json.get('email', admin_put['email'])
            print('email:',email)
            password = request.json.get('password', admin_put['password'])
            print('password:',password)
            repeat_password = request.json.get('repeat_password', admin_put['password'])
            print('repeat_password:',repeat_password)

            admin = Admin(name, lastname, email, password, repeat_password, collection_admin).toDBCollection()
            print('admin------------',admin)

            collection_admin.update_one(
                {'email': id},
                {'$set': {
                    'name': name,
                    'lastname': lastname,
                    'email': email,
                    'password': password
                }}
            )
            updated_admin = collection_admin.find_one({'email': email})
            response = {
                'name': name,
                'lastname': lastname,
                'email': email,
                'password': updated_admin['password']
            }

        except Exception as e:
            print('Error:', e)
            return jsonify({'error': 'Error al crear el admin', 'message': str(e)}), HTTPStatus.BAD_REQUEST

        return jsonify(response), HTTPStatus.OK

@admins_blueprint.route('/<email>', methods=['DELETE'])
def delete_user(email):
    admin = collection_admin.find_one({'email': email})
    if not admin:
        return {"error": "Admin not found"}, HTTPStatus.NOT_FOUND

    # Actualizar el campo de estado para desactivar el administrador
    collection_admin.update_one({'email': email}, {'$set': {'active': False}})

    return {"message": "Admin deactivated"}, HTTPStatus.OK
