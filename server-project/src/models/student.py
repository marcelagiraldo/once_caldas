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

    def validate_password(self):
        if self.password != self.repeat_password:
            return False
        return True

    @staticmethod
    def hash_password(password):
        if not password:
            raise AssertionError('Password not provided')

        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            raise AssertionError('Password must contain 1 capital letter and 1 number')

        if len(password) < 7 or len(password) > 50:
            raise AssertionError('Password must be between 7 and 50 characters')
        return generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)

    def toDBCollection(self):
        hashed = self.hash_password(self.password)
        return{
            "document":self.document,
            "type_document":self.type_document,
            "name":self.name,
            "lastname":self.last_name,
            "email":self.email,
            "password":hashed
        }
