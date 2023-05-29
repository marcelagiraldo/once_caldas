from flask import Blueprint, request,jsonify
from http import HTTPStatus
from src.models.student import Student
from flask_jwt_extended import jwt_required
from app import db

if 'students' not in db.list_collection_names():
    db.create_collection('students')
collection_student = db['students']

students = Blueprint("students",__name__,url_prefix="/api/v1/students")

@students.post('/')
def created_user():
    try:
        document = request.json.get('document')
        type_document = request.json.get('type_document')
        name = request.json.get('name')
        lastname = request.json.get('lastname')
        email = request.json.get('email')
        password = request.json.get('password')

        student = Student(document, type_document, name, lastname, email, password)

        result = collection_student.insert_one(student.toDBCollection())
        inserted_id = result.inserted_id

        # Obtener el estudiante insertado
        inserted_student = collection_student.find_one({'_id': inserted_id})

        response = {
            'document': inserted_student['document'],
            'type_document': inserted_student['type_document'],
            'name': inserted_student['name'],
            'lastname': inserted_student['lastname'],
            'email': inserted_student['email'],
            'password': inserted_student['password']
        }
    except Exception as e:
        return {'Error al crear el estudiante'}, HTTPStatus.BAD_REQUEST

    return jsonify(response), HTTPStatus.CREATED

@students.get('/todos')
def get_students():
    students_find = collection_student.find()
    students_list = []

    for student in students_find:
        students_list.append({
            'document':student['document'],
            'type_document':student['type_document'],
            'name':student['name'],
            'lastname':student['lastname'],
            'email':student['email'],
            'password':student['password'],
        })

    return jsonify(students_list)

@students.route('/', methods=['GET','PUT','DELETE'])
@jwt_required()
def get_student():
    document


@students.get('/<document_student>')
def get_student(document_student):
    student_find = collection_student.find_one({'document':document_student})
    if student_find:
        response = {
            'document':student_find['document'],
            'type_document':student_find['type_document'],
            'name':student_find['name'],
            'lastname':student_find['lastname'],
            'email':student_find['email'],
            'password':student_find['password'],
        }
        return jsonify(response),HTTPStatus.OK
    else:
        return {"error":"Resource not found"}, HTTPStatus.NOT_FOUND

@students.put('/<document>')
def update_user(document):
    try:
        student_put = collection_student.find_one({'document': document})
        if not student_put:
            return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

        type_document = request.json.get('type_document', student_put['type_document'])
        name = request.json.get('name', student_put['name'])
        lastname = request.json.get('lastname', student_put['lastname'])
        email = request.json.get('email', student_put['email'])
        password = request.json.get('password', student_put['password'])

        student_put = collection_student.update_one(
            {'document': document},
            {'$set': Student(document, type_document, name, lastname, email, password).toDBCollection()}
        )

        # Consultar el estudiante actualizado
        updated_student = collection_student.find_one({'document': document})

        response = {
            'document': updated_student['document'],
            'type_document': updated_student['type_document'],
            'name': updated_student['name'],
            'lastname': updated_student['lastname'],
            'email': updated_student['email'],
            'password': updated_student['password']
        }

    except Exception as e:
        print('Error:', e)
        return 'El estudiante no pudo ser actualizado', HTTPStatus.BAD_REQUEST

    return jsonify(response), HTTPStatus.OK

@students.delete('/<document>')
def delete_user(document):
    try:
        collection_student.delete_one({'document':document})
    except Exception as e:
        return print("Error al eliminar el estudiante",e),HTTPStatus.BAD_REQUEST

    return "data:''",HTTPStatus.NO_CONTENT





