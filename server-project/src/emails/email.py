# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def mensaje ():
    message = Mail(
        from_email='geraldine.urrear@autonoma.edu.com',
        to_emails='geraldine.urrear@autonoma.edu.com',
        subject='¡Hola desde SendGrid!',
        html_content='<strong>Este es un correo de prueba enviado con SendGrid.>')
    try:
        sg = SendGridAPIClient(os.environ.get('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'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print("error",e)
