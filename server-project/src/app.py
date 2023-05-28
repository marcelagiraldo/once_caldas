from flask import Flask,request
from endpoints.students import students
from endpoints.admins import admins
from endpoints.players import players

app = Flask(__name__)

app.register_blueprint(students)
app.register_blueprint(admins)
app.register_blueprint(players)

if __name__ == "__main__":
    app.run(debug=True)

