from flask import Flask,jsonify
from os import environ
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo import MongoClient
from extensions import mongo

app = Flask(__name__,instance_relative_config=True)
try:
    app.config['MONGO_URI']='mongodb+srv://once_project:once_project@cluster0.1nsgtwx.mongodb.net/?retryWrites=true&w=majority'
    mongo = PyMongo(app)
    client = MongoClient(app.config['MONGO_URI'])
    db = client['db_project']
    CORS(app)
    print('Conexion con exito a db')
except Exception as e:
    print('error: ',e)

from src.endpoints.admins import admins_blueprint
# Registrar el blueprint
app.register_blueprint(admins_blueprint)

if __name__ == "__main__":
 app.run(debug=True)
