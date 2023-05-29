from flask import Flask,jsonify
from os import environ
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
from extensions import mongo,jwt
from src.emails.email import mensaje
app = Flask(__name__,instance_relative_config=True)
try:
    app.config['MONGO_URI']='mongodb+srv://once_project:once_project@cluster0.1nsgtwx.mongodb.net/?retryWrites=true&w=majority'
    app.config['JWT_SECRET_KEY'] = 'secret_key'
    mongo = PyMongo(app)
    client = MongoClient(app.config['MONGO_URI'])
    db = client['db_project']
    CORS(app)
    print('Conexion con exito a db')
except Exception as e:
    print('error: ',e)
mensaje()
mongo.init_app(app)
jwt.init_app(app)
from src.endpoints.admins import admins_blueprint
# Registrar el blueprint
app.register_blueprint(admins_blueprint)
from src.endpoints.auth import auth
app.register_blueprint(auth)
from src.endpoints.students import students
app.register_blueprint(students)
from src.endpoints.players import players
app.register_blueprint(players)
from src.endpoints.fevolutions import evolutions
app.register_blueprint(evolutions)

if __name__ == "__main__":
 app.run(debug=True)

