from database import db_connection
from flask import Blueprint, request,jsonify
from http import HTTPStatus

from models.admin import Admin

db = db_connection()

collection_admin = db.admins

admins = Blueprint("admins",__name__,url_prefix="/api/v1/admins")

@admins.post('/')
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

        # Obtener el admin insertado
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

@admins.get('/')
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

@admins.get('/<email>')
def get_admin(email):
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

@admins.put('/<email>')
def update_user(email):
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

        response = {
            'name': name,
            'lastname': lastname,
            'email': email,
            'password': password
        }

    except Exception as e:
        print('Error:', e)
        return 'El admin no pudo ser actualizado', HTTPStatus.BAD_REQUEST

    return jsonify(response), HTTPStatus.OK

@admins.delete('/<email>')
def delete_user(email):
    try:
        collection_admin.delete_one({'email':email})
    except Exception as e:
        return print("Error al eliminar el estudiante",e),HTTPStatus.BAD_REQUEST

    return "data:''",HTTPStatus.NO_CONTENT
