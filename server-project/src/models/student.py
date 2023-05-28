from werkzeug.security import generate_password_hash,check_password_hash
''' from mongoengine import Document, StringField, EmailField, DateTimeField, ReferenceField, connect

class Student_model(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)


 '''
class Student:
    def __init__(self,document,type_document,name,lastname,email,password):
        self.document = document
        self.type_document = type_document
        self.name = name
        self.last_name = lastname
        self.email = email
        self.password = password

    def toDBCollection(self):
        hashed = generate_password_hash(self.password)
        return{
            "document":self.document,
            "type_document":self.type_document,
            "name":self.name,
            "lastname":self.last_name,
            "email":self.email,
            "password":hashed
        }
