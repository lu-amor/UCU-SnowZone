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

if __name__ == '__main__':
    app.run(debug=True)
