from werkzeug.security import generate_password_hash,check_password_hash
from http import HTTPStatus
import re

class Admin:
    def __init__(self,name,lastname,email,password,repeat_password):
        self.name = name
        self.last_name = lastname
        self.email = email
        self.password = password
        self.repeat_password = repeat_password

        ''' if not self.validate_password():
            raise AssertionError('Passwords do not match')

        if not self.validate_email(collection_admin,email):
            raise AssertionError('Passwords do not match') '''

    @staticmethod
    def verify_password(password,repeat_password):
        try:
            if password == repeat_password:
                hashed = generate_password_hash(password)
        except Exception as e:
            return "Las contraseñas son diferentes",e,HTTPStatus.BAD_REQUEST
        return hashed

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

    def validate_email(self,collection_admin,email):
        if not email:
            return False
        #Validar que el email tenga la estructura
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, email):
            return False

        # Validar que el email no se repita en la base de datos
        existing_admin = collection_admin.find_one({'email': email})
        if existing_admin:
            return False

        return True

    def toDBCollection(self):
        hashed = self.verify_password(self.password,self.repeat_password)
        return {
            "name": self.name,
            "lastname": self.last_name,
            "email": self.email,
            "password": hashed
        }


    ''' @staticmethod
    def verify_password(password,repeat_password):
        try:
            if password == repeat_password:
                hashed = generate_password_hash(password)
        except Exception as e:
            return "Las contraseñas son diferentes",e,HTTPStatus.BAD_REQUEST
        return hashed '''

    ''' def validate_email(self,collection_admin):
        #Validar que el email tenga la estructura
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, self.email):
            return False

        # Validar que el email no se repita en la base de datos
        existing_admin = collection_admin.find_one({'email': self.email})
        if existing_admin:
            return False

        return True

    def check_password(self,password):
        return check_password_hash(self.password,password) '''

    ''' def toDBCollection(self):
        hashed = self.verify_password(self.password,self.repeat_password)
        return{
            "name":self.name,
            "lastname":self.last_name,
            "email":self.email,
            "password":hashed
        } '''
