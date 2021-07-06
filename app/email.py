from . import mail
from flask_mail import Message
from flask import current_app, render_template
from threading import Thread


def send_async_message(app, msg):
    with app.app_context():
        mail.send(msg)

def send_email(to, subject, template, **kwargs):
    app = current_app._get_current_object()
    msg = Message(
        subject=app.config["MAIL_SUBJECT_PREFIX"] + subject,
        sender=app.config['MAIL_USERNAME'],
        recipients=[to]
    )
    msg.body = render_template(f'{template}.txt', **kwargs)
    msg.html = render_template(f'{template}.html', **kwargs)
    thr = Thread(target=send_async_message, args=[app, msg])
    thr.start()
    return thr