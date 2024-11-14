from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin
from flask_cors import CORS
from config import app, get_db_connection

app = Flask(__name__)

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

@app.route("/students", methods=["GET"])
def get_contacts():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM alumno")
        students = cursor.fetchall()
        #json_students = list(map(lambda x: x.to_json(), students))
        cursor.close()
        connection.close()
        return jsonify({"students": students})
    except Exception as e:
        return (
            jsonify({"message": str(e)}), 400
        )
        

@app.route("/create_student", methods=["POST"])
def create_student():
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

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

@app.route('/protected')
@login_required
def protected():
    return "Esta es un área protegida."

@app.route('/api/actividades', methods=['GET'])
def api_actividades():
    cursor.execute("SELECT * FROM actividades")
    value = cursor.fetchall()
    return jsonify(value)

@app.route('/api/add_actividad', methods=['POST'])
def api_add_actividad():
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

@app.route('/api/update_actividad/<int:id>', methods=['PATCH'])
def api_update_actividad(id):
    data = request.json
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

    if not fields:
        return jsonify({"error": "No fields provided for update"}), 400

    try:
        cursor.execute("UPDATE actividades SET " + ', '.join(fields) + " WHERE id = %s", values + [id])
        connection.commit()
        return jsonify({"message": "Actividad actualizada correctamente"}), 200
    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/delete_actividad/<int:id>', methods=['DELETE'])
def api_delete_actividad(id):
    try:
        cursor.execute("DELETE FROM actividades WHERE id = %s", (id,))
        connection.commit()
        return jsonify({"message": "Actividad eliminada correctamente"}), 200
    except Exception as e:
        connection.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
