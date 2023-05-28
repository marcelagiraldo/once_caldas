from werkzeug.security import generate_password_hash,check_password_hash
from http import HTTPStatus

class Admin:
    def __init__(self,name,lastname,email,password,repeat_password):
        self.name = name
        self.last_name = lastname
        self.email = email
        self.password = password
        self.repeat_password = repeat_password

    @staticmethod
    def verify_password(password,repeat_password):
        try:
            if password == repeat_password:
                hashed = generate_password_hash(password)
        except Exception as e:
            return "Las contraseñas son diferentes",e,HTTPStatus.BAD_REQUEST
        return hashed

    def toDBCollection(self):
        hashed = self.verify_password(self.password,self.repeat_password)
        return{
            "name":self.name,
            "lastname":self.last_name,
            "email":self.email,
            "password":hashed
        }
