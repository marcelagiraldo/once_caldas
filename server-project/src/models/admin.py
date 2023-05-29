from werkzeug.security import generate_password_hash,check_password_hash
from http import HTTPStatus
import re

from werkzeug.security import generate_password_hash, check_password_hash
from http import HTTPStatus
import re


class Admin:
    def __init__(self, name, lastname, email, password, repeat_password,collection):
        self.name = name
        self.last_name = lastname
        self.email = email
        self.password = password
        self.repeat_password = repeat_password
        self.collection = collection

    @staticmethod
    def hash_password(password):
        if not password:
            raise AssertionError('Password not provided')

        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            raise AssertionError('Password must contain at least 1 uppercase letter and 1 digit')

        if not 7 <= len(password) <= 50:
            raise AssertionError('Password must be between 7 and 50 characters')

        return generate_password_hash(password)

    @staticmethod
    def validate_password(password,repeat_password):
        if not password:
            return False, 'Password not provided'

        if not password==repeat_password:
            return False, 'Password not equal'

        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            return False, 'Password must contain at least 1 uppercase letter and 1 digit'

        if not 7 <= len(password) <= 50:
            return False, 'Password must be between 7 and 50 characters'

        return True, ''

    @staticmethod
    def validate_email(collection, email):
        if not email:
            return False, 'Email not provided'

        # Validar que el email tenga la estructura adecuada
        email_pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_pattern, email):
            return False, 'Invalid email format'

        # Validar que el email no se repita en la base de datos
        existing_admin = collection.find_one({'email': email})
        if existing_admin:
            return False, 'Email already exists'

        return True, ''

    @staticmethod
    def validate_name(name):
        if not name:
            return False, 'Name not provided'

        if re.search(r'\d', name) or re.search(r'[^a-zA-Z\s]', name):
            return False, 'Name contains numbers or special characters'

        return True, ''

    @staticmethod
    def validate_lastname(lastname):
        if not lastname:
            return False, 'Last name not provided'

        if re.search(r'\d', lastname) or re.search(r'[^a-zA-Z\s]', lastname):
            return False, 'Last name contains numbers or special characters'

        return True, ''

    def check_password(self,password):
        return check_password_hash(self.password,password)

    def toDBCollection(self):
        print('------------------aqui ta model--------------')
        #validating password
        valid_password, password_error = self.validate_password(self.password,self.repeat_password)
        if not valid_password:
            return None, password_error
        #validatin email
        valid_email, email_error = self.validate_email(self.collection, self.email)
        if not valid_email:
            return None, email_error
        # Validating name
        valid_name, name_error = self.validate_name(self.name)
        if not valid_name:
            return None, name_error
        # Validating last name
        valid_lastname, lastname_error = self.validate_lastname(self.last_name)
        if not valid_lastname:
            return None, lastname_error
        #Crear hash de password
        hashed_password = self.hash_password(self.password)

        return {
            "name": self.name,
            "lastname": self.last_name,
            "email": self.email,
            "password": hashed_password,
            "active":True
        }, None



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
