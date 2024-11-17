from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from flask_cors import CORS
from config import app, get_db_connection
from routes.get_all import registrar_rutas

app = Flask(__name__)
registrar_rutas(app)

CORS(app)
app.secret_key = 'your_secret_key'
login_manager = LoginManager()
login_manager.init_app(app)

users = {'admin': 'password123'}

class User(UserMixin):
    def __init__(self, id):
        self.id = id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        # Verificación de credenciales
        if username in users and users[username] == password:
            user = User(username)
            login_user(user)
            redirect(url_for('protected'))
            return jsonify({"message": "Login successful", "status": "success"})
        else:
            flash('Usuario o contraseña incorrectos. Inténtalo de nuevo.')
            return jsonify({"message": "Invalid username or password", "status": "error"}), 401

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/protected')
@login_required
def protected():
    return "Esta es un área protegida."

@app.route('/students', defaults={'student_id': None}, methods=['GET', 'POST', 'PATCH', 'DELETE'])
@app.route("/students/<int:student_id>", methods=["GET", "POST", "DELETE", "PATCH"])
def students(student_id):
    if request.method == 'POST':
        cedula = request.json.get("ci")
        nombre = request.json.get("nombre")
        apellido = request.json.get("apellido")
        f_nac = request.json.get("f_nac")
        mail = request.json.get("mail")
        tel = request.json.get("tel")

        if not cedula or not nombre or not apellido or not f_nac or not mail or not tel:
            return (
                jsonify({"message": "Completar informacion del estudiante"}),
                400,
            )
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()

            new_student = """
                INSERT INTO alumno (ci, nombre, apellido, f_nac, mail, tel)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(new_student, (cedula, nombre, apellido, f_nac, mail, tel))
            connection.commit()

            cursor.close()
            connection.close()

        except Exception as e:
            return jsonify({"message": str(e)}),400

        return jsonify({"message": "Alumno creado correctamente"}), 201
    if request.method == 'GET':
        try:
            connection = get_db_connection()
            cursor = connection.cursor(dictionary=True)
            if student_id is None:
                cursor.execute("SELECT * FROM alumno")
            else:
                cursor.execute("SELECT * FROM alumno WHERE ci= %s", (student_id,))
            students = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify({"students": students})
        except Exception as e:
            return (jsonify({"message": str(e)}), 400
        )
    if request.method == 'DELETE':
        try:
            connection = get_db_connection()
            cursor = connection.cursor(dictionary=True)
            cursor.execute("DELETE FROM alumno WHERE ci = %s", (student_id,))
            connection.commit()
            cursor.close()
            connection.close()
        except Exception as e:
            cursor.close()
            connection.close()  
            return jsonify({"message": str(e)}),400
        return jsonify({"message": "Alumno eliminado correctamente"}), 201
    if request.method == 'PATCH':
        data = request.json
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

        if not fields:
            return jsonify({"error": "No hay campos para actualizar"}), 400

        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            cursor.execute("UPDATE alumno SET " + ', '.join(fields) + " WHERE ci = %s", values + [student_id])
            connection.commit()
            return jsonify({"message": "Alumno actualizado correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

@app.route('/activities', defaults={'id_act': None}, methods=['GET', 'POST', 'PATCH', 'DELETE'])    
@app.route('/activities/<int:id_act>', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def api_actividades(id_act):
    if request.method == 'POST':
        descripcion = request.json.get("descripcion")
        costo = request.json.get("costo")
        min_edad = request.json.get("min_edad")
        
        if not descripcion or not costo or not min_edad:
            return (
                jsonify({"message": "Completar informacion de la actividad"}),
                400,
            )
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()

            new_activity = """
                INSERT INTO actividades (descripcion, costo, min_edad)
                VALUES (%s, %s, %s)
            """
            cursor.execute(new_activity, (descripcion, costo, min_edad))
            connection.commit()

            cursor.close()
            connection.close()

        except Exception as e:
            return jsonify({"message": str(e)}),400

        return jsonify({"message": "Actividad creada correctamente"}), 201
 
    if request.method == 'GET':
        try:
            connection = get_db_connection()
            cursor = connection.cursor(dictionary=True)
            if id_act is None:
                cursor.execute("SELECT * FROM actividades")
            else:
                cursor.execute("SELECT * FROM actividades WHERE id= %s", (id_act,))
            activities = cursor.fetchall()
            cursor.close()
            connection.close()
            return jsonify({"activities": activities})
        except Exception as e:
            return (jsonify({"message": str(e)}), 400
        )
    
    if request.method == 'DELETE':
        try:
            connection = get_db_connection()
            cursor = connection.cursor(dictionary=True)
            cursor.execute("DELETE FROM actividades WHERE id = %s", (id_act,))
            connection.commit()
            cursor.close()
            connection.close()
        except Exception as e:
            cursor.close()
            connection.close()  
            return jsonify({"message": str(e)}),400
        return jsonify({"message": "Alumno eliminado correctamente"}), 201
    if request.method == 'PATCH':
        data = request.json
        fields = []
        values = []

        if 'min_edad' in data:
            fields.append('min_edad = %s')
            values.append(data['min_edad'])
        if 'descripcion' in data:
            fields.append('descripcion = %s')
            values.append(data['descripcion'])
        if 'costo' in data:
            fields.append('costo = %s')
            values.append(data['costo'])

        if not fields:
            return jsonify({"error": "No hay campos para actualizar"}), 400

        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            cursor.execute("UPDATE actividades SET " + ', '.join(fields) + " WHERE id = %s", values + [id_act])
            connection.commit()
            return jsonify({"message": "Alumno actualizado correctamente"}), 200
        except Exception as e:
            connection.rollback()
            return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)

#----------------------------------------- <3 Rutas de Clase :) ---------------------------------------------------

@app.route("/clases", methods =["GET"])
def clases():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clase")
        value = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify({"clases": value})
    except Exception as e:
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/get_clase/<int:id>", methods=["GET"])
def get_clase(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM clase WHERE id = %s", (id,))
        clase = cursor.fetchone()
        if clase:
            return jsonify({"clase": clase}), 200
        else:
            cursor.close()
            connection.close()
            return jsonify({"error": "Clase no encontrada"}), 404
    except Exception as e:
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/delete_clase/<int:id>", methods=["DELETE"])
def delete_clase(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("DELETE FROM clase WHERE id = %s", (id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Clase eliminada correctamente"}), 200
    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/add_clase", methods=["POST"])
def add_clase():
    data = request.json
    profesor = request.json.get("ci_instructor")
    actividad = request.json.get("id_actividad")
    turno = request.json.get("id_turno")

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("INSERT INTO clase (ci_instructor, id_actividad, id_turno) VALUES ( %s, %s, %s)",
                       ( profesor, actividad, turno))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Clase agregada correctamente"}), 201
    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/update_clase/<int:id>", methods=["PATCH"])
def update_clase(id):
    data = request.json
    fields = []
    values = []

    
    if "ci_instructor" in data:
        fields.append("ci_instructor = %s")
        values.append(data["ci_instructor"])
    if "id_actividad" in data:
        fields.append("id_actividad = %s")
        values.append(data["id_actividad"])
    if "id_turno" in data:
        fields.append("Id_turno = %s")
        values.append(data["id_turno"])

    if not fields:
        cursor.close()
        connection.close()
        return jsonify({"error": "No se proporcionaron campos para actualizar"}), 400

    values.append(id)
    
    try:
        query = f"UPDATE clase SET {', '.join(fields)} WHERE id = %s"
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query, tuple(values))
        connection.commit()
        return jsonify({"message": "Clase actualizada correctamente"}), 200
    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

# --------------------------------- <3Rutas de Equipamiento :) ---------------------------------

@app.route("/equipamiento")
def equipamiento():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM equipamiento_kit")
    value = cursor.fetchall()
    return jsonify({"equipamiento": value}), 201

@app.route("/add_equipamiento", methods=["POST"])
def add_equipamiento():
    data = request.json
    id_actividad = request.json.get("id_actividad")
    descripcion = request.json.get("descripcion")
    tamanio = request.json.get("tamanio")
    costo = request.json.get("costo")
    cant_disponibles = request.json.get("cant_disponibles")

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(
            "INSERT INTO equipamiento_kit (id_actividad, descripcion, tamanio, costo, cant_disponibles) "
            "VALUES (%s, %s, %s, %s, %s)", 
            (id_actividad, descripcion, tamanio, costo, cant_disponibles)
        )
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Equipamiento agregado correctamente"}), 201
    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/update_equipamiento/<int:id>", methods=["PATCH"])
def update_equipamiento(id):
    data = request.json
    fields = []
    values = []

    if "id_actividad" in data:
        fields.append("id_actividad = %s")
        values.append(data["id_actividad"])
    if "descripcion" in data:
        fields.append("descripcion = %s")
        values.append(data["descripcion"])
    if "tamanio" in data:
        fields.append("tamanio = %s")
        values.append(data["tamanio"])
    if "costo" in data:
        fields.append("costo = %s")
        values.append(data["costo"])
    if "cant_disponibles" in data:
        fields.append("cant_disponibles = %s")
        values.append(data["cant_disponibles"])

    if not fields:
        cursor.close()
        connection.close()
        return jsonify({"error": "No se proporcionaron campos para actualizar"}), 400

    values.append(id)
    
    try:
        query = f"UPDATE equipamiento_kit SET {', '.join(fields)} WHERE id = %s"
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query, tuple(values))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Equipamiento actualizado correctamente"}), 200
    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/get_equipamiento/<int:id>", methods=["GET"])
def get_equipamiento(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM equipamiento_kit WHERE id = %s", (id,))
        equipamiento = cursor.fetchone()
        if equipamiento:
            cursor.close()
            connection.close()
            return jsonify({"equipamiento": equipamiento}), 200
        else:
            cursor.close()
            connection.close()
            return jsonify({"error": "Equipamiento no encontrado"}), 404
    except Exception as e:
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/delete_equipamiento/<int:id>", methods=["DELETE"])
def delete_equipamiento(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("DELETE FROM equipamiento_kit WHERE id = %s", (id,))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Equipamiento eliminado correctamente"}), 200
    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)