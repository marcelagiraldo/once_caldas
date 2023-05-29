from flask import Blueprint, request,jsonify
from http import HTTPStatus
from src.models.student import Student
from flask_jwt_extended import jwt_required,get_jwt_identity
#from src.emails import mensaje
from app import db
from bson import ObjectId


if 'students' not in db.list_collection_names():
    db.create_collection('students')

collection_student = db['students']
collection_admin = db['admins']
students = Blueprint("students",__name__,url_prefix="/api/v1/admin/students")

@students.route('/', methods=['GET', 'POST'])
@jwt_required()
def get_students():
    id = get_jwt_identity()
    student_data = collection_admin.find_one({"_id": ObjectId(id)})
    print(student_data)
    if student_data['role'] == 'admin':
        if request.method == 'GET':
            students_find = collection_student.find()
            students_list = []

            for student in students_find:
                students_list.append({
                    'document': student['document'],
                    'name': student['name'],
                    'lastname': student['lastname'],
                    'email': student['email'],
                    'semester': student['semester'],
                    'password': student['password'],
                })
            return jsonify(students_list)
        elif request.method == 'POST':
            try:
                document = request.json.get('document')
                name = request.json.get('name')
                lastname = request.json.get('lastname')
                email = request.json.get('email')
                semester = request.json.get('semester')
                password = request.json.get('password')

                student = Student(document, name, lastname, email, semester, password, collection_student)

                student_data, error = student.toDBCollection()
                if error:
                    print("Error:", error)
                else:
                    result = collection_student.insert_one(student_data)

                inserted_id = result.inserted_id

                # Obtener el estudiante insertado
                inserted_student = collection_student.find_one({'_id': inserted_id})

                response = {
                    'document': inserted_student['document'],
                    'name': inserted_student['name'],
                    'lastname': inserted_student['lastname'],
                    'email': inserted_student['email'],
                    'semester': inserted_student['semester'],
                    'password': inserted_student['password']
                }
                return jsonify(response), HTTPStatus.CREATED
            except Exception as e:
                return jsonify({'error': 'Error al crear el estudiante', 'message': str(e)}), HTTPStatus.BAD_REQUEST
    else:
        return {'error': 'Acceso no autorizado'}, HTTPStatus.UNAUTHORIZED

@students.route('/<document>', methods=['GET','PUT'])
@jwt_required()
def functions_student(document):
    print(document)
    id = get_jwt_identity()
    admin_data = collection_admin.find_one({"_id": ObjectId(id)})
    student_data = collection_student.find_one({"_id": ObjectId(id)})
    print('soy data-------------', student_data)
    if (student_data['document'] == document):
        if request.method == 'GET':
            student_find = collection_student.find_one({'document':document})
            if student_find:
                response = {
                    'document':student_find['document'],
                    'name':student_find['name'],
                    'lastname':student_find['lastname'],
                    'email':student_find['email'],
                    'semester':student_find['semester'],
                    'password':student_find['password'],
                }
                return jsonify(response),HTTPStatus.OK
            else:
                return {"error":"Resource not found"}, HTTPStatus.NOT_FOUND
        elif request.method == 'PUT':
            try:
                student_put = collection_student.find_one({'document': document})
                if not student_put:
                    return {"error": "Resource not found"}, HTTPStatus.NOT_FOUND

                name = request.json.get('name', student_put['name'])
                lastname = request.json.get('lastname', student_put['lastname'])
                email = request.json.get('email', student_put['email'])
                semester = request.json.get('semester',student_put['semester'])
                password = request.json.get('password', student_put['password'])
                student = Student(document, name, lastname, email, semester, password,collection_student).toDBCollection()
                collection_student.update_one(
                    {'document': document},
                    {'$set': {
                        'document':document,'name':name,'lastname':lastname,'email':email,'semester':semester,'password':password
                    }}
                )

                # Consultar el estudiante actualizado
                updated_student = collection_student.find_one({'document': document})

                response = {
                    'document': document,
                    'name': name,
                    'lastname': lastname,
                    'email': email,
                    'semester':semester,
                    'password': updated_student['password']
                }

            except Exception as e:
                print('Error:', e)
                return 'El estudiante no pudo ser actualizado', HTTPStatus.BAD_REQUEST
            return jsonify(response), HTTPStatus.OK


@students.route('/<document>', methods=['DELETE'])
@jwt_required()
def delete_student(document):
    id = get_jwt_identity()
    student_data = collection_admin.find_one({"_id": ObjectId(id)})
    print(student_data)
    if student_data['role'] == 'admin':
        admin = collection_student.find_one({'document': document})
        if not admin:
            return {"error": "Student not found"}, HTTPStatus.NOT_FOUND

        # Actualizar el campo de estado para desactivar el administrador
        collection_admin.update_one({'document': document}, {'$set': {'active': False}})

        return {"message": "Student deactivated"}, HTTPStatus.OK
