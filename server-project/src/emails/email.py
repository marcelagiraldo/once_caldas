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
        print(e.message)
