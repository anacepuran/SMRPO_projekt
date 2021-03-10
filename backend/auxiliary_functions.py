from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime

def hash_password(password):
    password = generate_password_hash(password).decode('utf8')
    return password


def check_password(password, password_hash):
    return check_password_hash(password, password_hash)


def date_time():
    # datetime object containing current date and time
    now = datetime.now()

    print("now =", now)

    # dd/mm/YY H:M:S
    dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
    print("date and time =", dt_string)

    return dt_string
