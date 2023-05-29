from flask import Blueprint, request, jsonify
from http import HTTPStatus
from src.models.admin import Admin
from extensions import jwt,mongo
from app import db
from flask_jwt_extended import create_access_token

if 'admins' not in db.list_collection_names():
    db.create_collection('admins')

collection_admin = db['admins']

auth = Blueprint("auth",__name__,url_prefix="/api/v1/auth")

@auth.route('/login', methods=['POST'])
def login():
    print('----------------aqui ta auth---------------')
    data = request.get_json()
    if not data:
        return {'error': 'Missing JSON data'}, 400

    email = data.get('email')
    password = data.get('password')

    admin = collection_admin.find_one({'email': email})
    print(admin)

    if not admin or not Admin(admin['name'],admin['lastname'],admin['email'],admin['password'],admin['password'],collection_admin).check_password(password):
        return {'error': 'Wrong email or password'}, 401

    access_token = create_access_token(identity=str(admin['_id']))

    return {'access_token': access_token}, 200

@auth.route('admin/login', methods=['POST'])
def login_admin():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    admin_data = collection_admin.find_one({'email': username})
    admin = Admin(admin_data['name'], admin_data['lastname'], admin_data['email'], admin_data['password'],admin_data['password'],collection_admin)

    if not admin or not admin.check_password(password):
        return {"error": "Wrong username or password"}, HTTPStatus.UNAUTHORIZED
    access_token = create_access_token(identity=admin['email'])

    response = {"access_token": access_token}

    return response, HTTPStatus.OK

@auth.route('admin/student', methods=['POST'])
def login_student():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    admin = collection_admin.find_one({'email': username})

    if not admin:
        return {"error": "Wrong username or password"}, HTTPStatus.UNAUTHORIZED
    access_token = create_access_token(identity=admin['email'])

    response = {"access_token": access_token}

    return response, HTTPStatus.OK
