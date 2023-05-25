class Player:
    def __init__(self,document,type_document,name,lastname,email):
        self.document = document
        self.type_document = type_document
        self.name = name
        self.last_name = lastname
        self.email = email

    def toDBCollection(self):
        return{
            "document":self.document,
            "type_document":self.type_document,
            "name":self.name,
            "lastname":self.last_name,
            "email":self.email
        }
