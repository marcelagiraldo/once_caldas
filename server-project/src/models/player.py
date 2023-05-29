class Player:
    def __init__(self,document,type_document,name,lastname,department,city,age):
        self.document = document
        self.type_document = type_document
        self.name = name
        self.last_name = lastname
        self.department = department
        self.city = city
        self.age = age

    def toDBCollection(self):
        return{
            "document":self.document,
            "type_document":self.type_document,
            "name":self.name,
            "lastname":self.last_name,
            "department":self.department,
            "city":self.city,
            "age":self.age
        }
