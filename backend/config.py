import mysql.connector
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
        host="db",
        user="admin",
        password="adminpassword",
        database="obligatorio",
        port=3306
    )