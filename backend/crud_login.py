from flask import Flask, jsonify, request
import mysql.connector
import re

app = Flask(__name__)

def connect_bd():
    conn = mysql.connect('obligatorio.db')
    conn.row_factory = mysql.Row
    return conn

def validate_email(email):
    pattern = r'^[A-Za-z0-9._%+-]+@(ucu\\.edu\\.uy|correo\\.ucu\\.edu\\.uy)$'
    return re.match(pattern, email)
    
    
### login: mail, contraseña, rol
@app.route('/login', methods=['POST'])
def create_login():
    data = request.get_json()
    mail = data.get('mail')
    password = data.get('password', 'password123')
    rol = data.get('rol', 'student')
    
    if not validate_email(mail):
        return jsonify({'error': 'Invalid email'}), 400
    
    if rol not in ['student', 'teacher', 'admin']:
        return jsonify({'error': 'Invalid role'}), 400
    
    conn = connect_bd()
    cursor = conn.cursor()
    
    try:
        cursor.execute('INSERT INTO login(mail, password, rol) VALUES (?, ?, ?)', (mail, password, rol))
        conn.commit()
        return jsonify({'mail': mail, 'password': password, 'rol': rol}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        conn.close()
        
@app.route('/login/<string:mail>', methods=['PUT'])
def update_login(mail):
    data = request.get_json()
    password = data.get('password')
    rol = data.get('rol', 'student')
    
    if rol not in ['student', 'teacher', 'admin']:
        return jsonify({'error': 'Invalid role'}), 400
    
    conn = connect_bd()
    cursor = conn.cursor()
    try:
        cursor.execute('UPDATE login SET password = ?, rol = ? WHERE mail = ?', (password, rol, mail))
        conn.commit()
        return jsonify({'mail': mail, 'password': password, 'rol': rol}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        conn.close()
        
@app.route('/login/<string:mail>', methods=['DELETE'])
def delete_login(mail):
    conn = connect_bd()
    cursor = conn.cursor()
    try:
        cursor.execute('DELETE FROM login WHERE mail = ?', (mail,))
        conn.commit()
        return jsonify({'message': 'user deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    finally:
        conn.close()
        
if __name__ == '__main__':
    app.run(debug=True)