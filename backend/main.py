from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from flask_cors import CORS
import json
import secrets
import os
import mysql.connector

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
app.secret_key = '16547835f867ebafc61e3b4fb3a9622d'
login_manager = LoginManager()
login_manager.init_app(app)

users = {'admin': 'password123'}

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="rootpassword",
    database="obligatorio"
)
cursor = connection.cursor(dictionary=True)

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

# Rutas actividad
@app.route('/api/activities', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def api_actividad():
    if request.method == 'GET':
        cursor.execute("SELECT * FROM actividades")
        value = cursor.fetchall()
        return jsonify(value)

    elif request.method == 'POST':
        data = request.json
        descripcion = data.get('descripcion')
        costo = data.get('costo')
        min_edad = data.get('min_edad')

        try:
            cursor.execute("INSERT INTO actividades (descripcion, costo, min_edad) VALUES (%s, %s, %s)", (descripcion, costo, min_edad))
            connection.commit()
            return jsonify({"message": "Actividad agregada correctamente"}), 201
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

    elif request.method == 'PATCH':
        data = request.json
        id = data.get('id')
        fields = []
        values = []

        if 'descripcion' in data:
            fields.append('descripcion = %s')
            values.append(data['descripcion'])
        if 'costo' in data:
            fields.append('costo = %s')
            values.append(data['costo'])
        if 'min_edad' in data:
            fields.append('min_edad = %s')
            values.append(data['min_edad'])

        if not fields or not id:
            return jsonify({"error": "No fields provided for update or missing id"}), 400

        try:
            cursor.execute("UPDATE actividades SET " + ', '.join(fields) + " WHERE id = %s", values + [id])
            connection.commit()
            return jsonify({"message": "Actividad actualizada correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

    elif request.method == 'DELETE':
        id = request.args.get('id')
        if not id:
            return jsonify({"error": "Missing id parameter"}), 400

        try:
            cursor.execute("DELETE FROM actividades WHERE id = %s", (id,))
            connection.commit()
            return jsonify({"message": "Actividad eliminada correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

@app.route('/api/students', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def api_student():
    if request.method == 'GET':
        cursor.execute("SELECT * FROM students")
        value = cursor.fetchall()
        return jsonify(value)

    elif request.method == 'POST':
        data = request.json
        ci = data.get('ci')
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        f_nac = data.get('f_nac')
        mail = data.get('mail')
        tel = data.get('tel')

        try:
            cursor.execute("INSERT INTO students (ci, nombre, apellido, f_nac, mail, tel) VALUES (%s, %s, %s, %s, %s, %s)", (ci, nombre, apellido, f_nac, mail, tel))
            connection.commit()
            return jsonify({"message": "Estudiante agregado correctamente"}), 201
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

    elif request.method == 'PATCH':
        data = request.json
        id = data.get('id')
        fields = []
        values = []

        if 'ci' in data:
            fields.append('ci = %s')
            values.append(data['ci'])
        if 'nombre' in data:
            fields.append('nombre = %s')
            values.append(data['nombre'])
        if 'apellido' in data:
            fields.append('apellido = %s')
            values.append(data['apellido'])
        if 'f_nac' in data:
            fields.append('f_nac = %s')
            values.append(data['f_nac'])
        if 'mail' in data:
            fields.append('mail = %s')
            values.append(data['mail'])
        if 'tel' in data:
            fields.append('tel = %s')
            values.append(data['tel'])

        if not fields or not id:
            return jsonify({"error": "No fields provided for update or missing id"}), 400

        try:
            cursor.execute("UPDATE students SET " + ', '.join(fields) + " WHERE id = %s", values + [id])
            connection.commit()
            return jsonify({"message": "Estudiante actualizado correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

    elif request.method == 'DELETE':
        id = request.args.get('id')
        if not id:
            return jsonify({"error": "Missing id parameter"}), 400

        try:
            cursor.execute("DELETE FROM students WHERE id = %s", (id,))
            connection.commit()
            return jsonify({"message": "Estudiante eliminado correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

@app.route('/api/instructors', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def api_instructor():
    if request.method == 'GET':
        cursor.execute("SELECT * FROM instructores")
        value = cursor.fetchall()
        return jsonify(value)

    elif request.method == 'POST':
        data = request.json
        ci = data.get('ci')
        nombre = data.get('nombre')
        apellido = data.get('apellido')
        mail = data.get('mail')
        tel = data.get('tel')

        try:
            cursor.execute("INSERT INTO instructores (ci, nombre, apellido, mail, tel) VALUES (%s, %s, %s, %s, %s)", (ci, nombre, apellido, mail, tel))
            connection.commit()
            return jsonify({"message": "Instructor agregado correctamente"}), 201
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

    elif request.method == 'PATCH':
        data = request.json
        id = data.get('id')
        fields = []
        values = []

        if 'ci' in data:
            fields.append('ci = %s')
            values.append(data['ci'])
        if 'nombre' in data:
            fields.append('nombre = %s')
            values.append(data['nombre'])
        if 'apellido' in data:
            fields.append('apellido = %s')
            values.append(data['apellido'])
        if 'mail' in data:
            fields.append('mail = %s')
            values.append(data['mail'])
        if 'tel' in data:
            fields.append('tel = %s')
            values.append(data['tel'])

        if not fields or not id:
            return jsonify({"error": "No fields provided for update or missing id"}), 400

        try:
            cursor.execute("UPDATE instructores SET " + ', '.join(fields) + " WHERE id = %s", values + [id])
            connection.commit()
            return jsonify({"message": "Instructor actualizado correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

    elif request.method == 'DELETE':
        id = request.args.get('id')
        if not id:
            return jsonify({"error": "Missing id parameter"}), 400

        try:
            cursor.execute("DELETE FROM instructores WHERE id = %s", (id,))
            connection.commit()
            return jsonify({"message": "Instructor eliminado correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)