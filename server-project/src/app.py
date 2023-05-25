from flask import Flask,request
from endpoints.students import students
from endpoints.admins import admins

app = Flask(__name__)

app.register_blueprint(students)
app.register_blueprint(admins)


if __name__ == "__main__":
    app.run(debug=True)

