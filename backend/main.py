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

#patch & delete
#con instructores, shifts, actividades, clases, equipamiento, alumno-clase
#pensar selects de reportes

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
    

# --------------------------------- <3Rutas de Inscripcion (alumno_clase) :) ---------------------------------

@app.route("/inscripcion")
def inscripcion():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM alumno_clase")
    value = cursor.fetchall()
    return jsonify({"inscripcion": value}), 201

@app.route("/get_inscripcion/<int:id_clase>/<int:id_alumno>", methods=["GET"])
def get_inscripcion(id_clase, id_alumno):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM alumno_clase WHERE id_clase = %s AND id_alumno = %s", (id_clase, id_alumno))
        inscripcion = cursor.fetchone()
        if inscripcion:
            cursor.close()
            connection.close()
            return jsonify({"inscripcion": inscripcion}), 200
        else:
            cursor.close()
            connection.close()
            return jsonify({"error": "Inscripción no encontrada"}), 404
    except Exception as e:
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/add_inscripcion", methods=["POST"])
def add_inscripcion():
    data = request.json
    id_clase = request.json.get("id_clase")
    id_alumno = request.json.get("id_alumno")
    id_kit = request.json.get("id_kit")
    costo_total = 0

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Obtener costo de la clase/actividad
        cursor.execute("SELECT costo FROM obligatorio.actividades WHERE id = %s", (id_clase,))
        actividad = cursor.fetchone()
        if not actividad:
            raise Exception("Clase no encontrada")
        costo_total += actividad["costo"]

        # Si hay un kit, obtener su costo y sumarlo
        if id_kit:
            cursor.execute("SELECT costo FROM obligatorio.equipamiento_kit WHERE id = %s", (id_kit,))
            kit = cursor.fetchone()
            if not kit:
                raise Exception("Kit no encontrado")
            costo_total += kit["costo"]

            # Descontar el kit de la cantidad disponible
            cursor.execute(
                "UPDATE obligatorio.equipamiento_kit SET cant_disponibles = cant_disponibles - 1 WHERE id = %s",
                (id_kit,)
            )

        # Insertar inscripción con el costo calculado
        cursor.execute(
            "INSERT INTO obligatorio.alumno_clase (id_clase, id_alumno, id_kit, costo_total) "
            "VALUES (%s, %s, %s, %s)",
            (id_clase, id_alumno, id_kit, costo_total)
        )

        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Inscripción realizada correctamente", "costo_total": costo_total}), 201

    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500

@app.route("/delete_inscripcion/<int:id_clase>/<int:id_alumno>", methods=["DELETE"])
def delete_inscripcion(id_clase,id_alumno):

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Verificar si la inscripción existe
        cursor.execute(
            "SELECT id_kit FROM obligatorio.alumno_clase WHERE id_clase = %s AND id_alumno = %s",
            (id_clase, id_alumno)
        )
        inscripcion = cursor.fetchone()

        if not inscripcion:
            raise Exception("Inscripción no encontrada")

        # Obtener id_kit si existe
        id_kit = inscripcion['id_kit']

        # Eliminar la inscripción
        cursor.execute(
            "DELETE FROM obligatorio.alumno_clase WHERE id_clase = %s AND id_alumno = %s",
            (id_clase, id_alumno)
        )

        # Si hay un kit asociado, incrementar la cantidad disponible
        if id_kit:
            cursor.execute(
                "UPDATE obligatorio.equipamiento_kit SET cant_disponibles = cant_disponibles + 1 WHERE id = %s",
                (id_kit,)
            )

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Inscripción eliminada correctamente"}), 200


    except Exception as e:
        connection.rollback()
        cursor.close()
        connection.close()
        return jsonify({"error": str(e)}), 500


@app.route("/update_inscripcion/<int:id_clase>/<int:id_alumno>", methods=["PATCH"])
def update_inscripcion(id_clase, id_alumno):
    data = request.json
    fields = []
    values = []

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        if 'id_kit' in data:
            fields.append('id_kit = %s')
            values.append(data['id_kit'])

        if not fields:
            return jsonify({"error": "No fields provided for update"}), 400

        cursor.execute(
            "UPDATE alumno_clase SET " + ', '.join(fields) + " WHERE id_clase = %s AND id_alumno = %s",
            values + [id_clase, id_alumno]
        )

        # Recuperar los valores actuales de id_clase y id_kit en la bd para el cálculo
        cursor.execute("SELECT id_clase, id_kit FROM alumno_clase WHERE id_clase = %s AND id_alumno = %s", (id_clase, id_alumno))
        inscripcion = cursor.fetchone()
        
        if not inscripcion:
            print(f"Inscripción no encontrada para id_clase: {id_clase}, id_alumno: {id_alumno}")
            return jsonify({"error": "Inscripción no encontrada"}), 404

        # Usar el id_clase existente, para tener consistencia e integridad de datos
        id_clase_actual = inscripcion['id_clase']
        id_kit_actual = data.get('id_kit', inscripcion['id_kit'])

        # Imprimir valores para depuración
        print(f"id_clase_actual: {id_clase_actual}")
        print(f"id_kit_actual: {id_kit_actual}")

        # Obtener el costo de la clase asociada al id_clase_actual
        cursor.execute("SELECT id_actividad FROM obligatorio.clase WHERE id = %s", (id_clase_actual,))
        clase = cursor.fetchone()
        if not clase:
            raise Exception("Clase no encontrada")
        id_actividad = clase['id_actividad']

        cursor.execute("SELECT costo FROM obligatorio.actividades WHERE id = %s", (id_actividad,))
        actividad = cursor.fetchone()
        if not actividad:
            raise Exception("Actividad no encontrada")
        costo_clase = actividad["costo"]

        # Obtener el costo del kit (si existe)
        if id_kit_actual:
            cursor.execute("SELECT costo FROM obligatorio.equipamiento_kit WHERE id = %s", (id_kit_actual,))
            kit = cursor.fetchone()
            costo_kit = kit["costo"] if kit else 0
        else:
            costo_kit = 0

        print(f"costo_clase: {costo_clase}")
        print(f"costo_kit: {costo_kit}")

        # Calcula el nuevo costo total, sumando costo_clase y costo_kit
        costo_total = costo_clase + costo_kit

        print(f"costo_total: {costo_total}")

        cursor.execute(
            "UPDATE alumno_clase SET costo_total = %s WHERE id_clase = %s AND id_alumno = %s",
            (costo_total, id_clase_actual, id_alumno)
        )
        connection.commit()

        return jsonify({"message": "Inscripción actualizada correctamente"}), 200

    except Exception as e:
        if connection:
            connection.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

if __name__ == "__main__":
    app.run(debug=True)