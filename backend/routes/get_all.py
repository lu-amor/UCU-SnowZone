from flask import jsonify
from flask_login import login_required
from config import app, get_db_connection

def registrar_rutas(app):
    @app.route("/alumnos", methods=['GET'])
    @login_required
    def all_students():
        try:
            connection = get_db_connection()
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM alumno")
            students = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify({"students": students})
        except Exception as e:
            return (jsonify({"message": str(e)}), 400
        )
    @app.route('/actividades', methods=['GET'])
    @login_required
    def all_activities():
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM actividades")
        value = cursor.fetchall()
        return jsonify(value)