from flask import Blueprint, request, jsonify
from http import HTTPStatus
from src.models.admin import Admin
from src.models.student import Student
from extensions import jwt,mongo
from app import db
from flask_jwt_extended import create_access_token

''' if 'admins' or 'students' not in db.list_collection_names():
    db.create_collection('admins')
    db.create_collection('students') '''

collection_admin = db['admins']
collection_student = db['students']

auth = Blueprint("auth",__name__,url_prefix="/api/v1/auth")

@auth.route('/admin/login', methods=['POST'])
def login_admin():
    data = request.get_json()
    if not data:
        return {'error': 'Missing JSON data'}, HTTPStatus.NO_CONTENT

    email = data.get('email')
    password = data.get('password')

    admin = collection_admin.find_one({'email': email})
    print(admin)

    if not admin or not Admin(admin['name'],admin['lastname'],admin['email'],admin['password'],admin['password'],collection_admin).check_password(password):
        return {'error': 'Wrong email or password'}, HTTPStatus.UNAUTHORIZED

    access_token = create_access_token(identity=str(admin['_id']))

    return {'access_token': access_token}, HTTPStatus.CREATED

@auth.route('/student/login', methods=['POST'])
def login_student():
    data = request.get_json()
    print(data)
    if not data:
        return {'error': 'Missing JSON data'}, HTTPStatus.NO_CONTENT

    email = data.get('email')
    password = data.get('password')
    print(email)

    student = collection_student.find_one({'email': email})
    print("student",student)

    if not student or not Student(student['document'],student['name'],student['lastname'],student['email'],student['semester'],student['password'],collection_student).check_password(password):
        return {'error': 'Wrong email or password'}, HTTPStatus.UNAUTHORIZED

    access_token = create_access_token(identity=str(student['_id']))

    return {'access_token': access_token}, HTTPStatus.CREATED

