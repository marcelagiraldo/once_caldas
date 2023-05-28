from flask import Blueprint, request,jsonify
from http import HTTPStatus
from src.models.admin import Admin
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

        admin = Admin(name, lastname, email, password, repeat_password)

        result = collection_admin.insert_one(admin.toDBCollection())

        inserted_id = result.inserted_id
        inserted_admin = collection_admin.find_one({'_id': inserted_id})

        response = {
            'name': inserted_admin['name'],
            'lastname': inserted_admin['lastname'],
            'email': inserted_admin['email'],
            'password': inserted_admin['password']
        }
    except Exception as e:
        return 'Error al crear el admin',str(e), HTTPStatus.BAD_REQUEST

    return jsonify(response), HTTPStatus.CREATED

@admins_blueprint.route('/', methods=['GET'])
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

@admins_blueprint.route('/<email>', methods=['GET','PUT','DELETE'])
def get_admin(email):
    if request.method == 'GET':
        admin_find = collection_admin.find_one({'email':email})
        if admin_find:
            response = {
                'name':admin_find['name'],
                'lastname':admin_find['lastname'],
                'email':admin_find['email'],
                'password':admin_find['password'],
            }
            return jsonify(response),HTTPStatus.OK
        else:
            return {"error":"Resource not found"}, HTTPStatus.NOT_FOUND
    elif request.method == 'PUT':
        try:
            admin_put = collection_admin.find_one({'email': email})
            if not admin_put:
                return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

            name = request.json.get('name', admin_put['name'])
            lastname = request.json.get('lastname', admin_put['lastname'])
            email = request.json.get('email', admin_put['email'])
            password = request.json.get('password', admin_put['password'])
            repeat_password = request.json.get('repeat_password', admin_put['password'])

            result = collection_admin.update_one(
                {'email': email},
                {'$set': Admin(name, lastname, email, password, repeat_password).toDBCollection()}
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
            return 'El admin no pudo ser actualizado', HTTPStatus.BAD_REQUEST

        return jsonify(response), HTTPStatus.OK
    elif request.method == 'DELETE':
        try:
            collection_admin.delete_one({'email':email})
        except Exception as e:
            return print("Error al eliminar el estudiante",e),HTTPStatus.BAD_REQUEST

        return "data:[]",HTTPStatus.NO_CONTENT

