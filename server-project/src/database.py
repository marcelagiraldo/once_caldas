from flask_pymongo import PyMongo

def connection_db(app):
    try:
        mongodb = PyMongo(app,uri='mongodb+srv://once_project:once_project@cluster0.1nsgtwx.mongodb.net/?retryWrites=true&w=majority')
        db =mongodb.db
        print('conexion con exito a la db')
    except Exception as e:
        return 'Error en la conección',e
    return db

''' def db_connection():
    mongo_uri = 'mongodb+srv://once_project:once_project@cluster0.1nsgtwx.mongodb.net/?retryWrites=true&w=majority'
    try:
        client = MongoClient(mongo_uri,serverSelectionTimeoutMS=10000)
        db = client.db_project
        print("conexión exitosa a la base de datos")
    except Exception as e:
        print("error al establecer conexion",str(e))

    status = client.admin.command('replSetGetStatus')

    for member in status['members']:
        if member['stateStr'] == 'PRIMARY':
            print("Nodo primario encontrado:", member['name'])
            break
    else:
        print("No se encontró un nodo primario disponible")

    return db '''
