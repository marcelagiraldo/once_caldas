from werkzeug.security import generate_password_hash,check_password_hash
import re
class Student:
    def __init__(self,document,name,lastname,email,semester,password,collection):
        self.document = document
        self.name = name
        self.lastname = lastname
        self.email = email
        self.semester = int(semester)
        self.password = password
        self.collection = collection

    @staticmethod
    def hash_password(password):
        if not password:
            raise AssertionError('No se ingreso una contraseña')

        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            raise AssertionError('La contraseña debe contener al menos 1 letra mayúscula y 1 dígito')

        if not 7 <= len(password) <= 50:
            raise AssertionError('La contraseña debe tener entre 7 y 50 caracteres')

        return generate_password_hash(password)

    @staticmethod
    def validate_password(password):
        if not password:
            return False, 'No hay contraseña'

        if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
            return False, 'La contraseña debe contener al menos 1 letra mayúscula y 1 dígito'

        if not 7 <= len(password) <= 50:
            return False, 'La contraseña debe tener entre 7 y 50 caracteres'

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

    @staticmethod
    def validate_document(document):
        document_pattern = r'^\d+$'

        if not document:
            return False, 'document not provided'

        if not len(document)<=10:
            return False, 'Document must be between 10 characters'

        elif not re.match(document_pattern, document):
            return False, 'document contains letters or special characters'

        return True, ''

    def check_password(self,password):
        return check_password_hash(self.password,password)

    def toDBCollection(self):
        #validating password
        valid_password, password_error = self.validate_password(self.password)
        if not valid_password:
            return None, password_error
        #validating email
        valid_email, email_error = self.validate_email(self.collection, self.email)
        if not valid_email:
            return None, email_error
        # Validating name
        valid_name, name_error = self.validate_name(self.name)
        if not valid_name:
            return None, name_error
        # Validating lastname
        valid_lastname, lastname_error = self.validate_lastname(self.lastname)
        if not valid_lastname:
            return None, lastname_error
        #validated document
        valid_document, document_error = self.validate_document(self.document)
        if not valid_document:
            return None, document_error
        #Crear hash de password
        hashed_password = self.hash_password(self.password)

        return {
            "document": self.document,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "semester":self.semester,
            "password": hashed_password,
            "active":True
        }, None
