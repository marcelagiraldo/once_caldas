import re
from mongoengine import Document, ReferenceField
from src.models.fevolution import Evolution
class Player(Document):
    def __init__(self,document,type_document,name,lastname,department,city,age,collection):
        self.document = document
        self.type_document = type_document
        self.name = name
        self.lastname = lastname
        self.department = department
        self.city = city
        self.age = int(age)
        self.collection = collection
        self.evolutions = [ReferenceField('Evolution')]

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
    def validate_document(collection,document):
        document_pattern = r'^\d+$'

        if not document:
            return False, 'document not provided'

        if not len(document)<=10:
            return False, 'Document must be between 10 characters'

        elif not re.match(document_pattern, document):
            return False, 'document contains letters or special characters'

        existing_admin = collection.find_one({'document': document})
        if existing_admin:
            return False, 'Document already exists'

        return True, ''

    def toDBCollection(self):
        # Validating name
        valid_name, name_error = self.validate_name(self.name)
        if not valid_name:
            return None, name_error
        # Validating lastname
        valid_lastname, lastname_error = self.validate_lastname(self.lastname)
        if not valid_lastname:
            return None, lastname_error
        #validated document
        valid_document, document_error = self.validate_document(self.collection,self.document)
        if not valid_document:
            return None, document_error
        return{
            "document":self.document,
            "type_document":self.type_document,
            "name":self.name,
            "lastname":self.lastname,
            "department":self.department,
            "city":self.city,
            "age":self.age,
            "active":True
        }
