from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Conectar a la base de datos
def connect_db():
    return sqlite3.connect('database.db')

# Crear tabla de usuarios (correr esta función una vez)
def create_table():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS Usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        primer_apellido TEXT NOT NULL,
        correo TEXT NOT NULL,
        contraseña TEXT NOT NULL
    )''')
    conn.commit()
    conn.close()

# Ruta para mostrar el formulario de registro
@app.route('/registrarse', methods=['GET', 'POST'])
def registrarse():
    if request.method == 'POST':
        nombre = request.form['nombre']
        primer_apellido = request.form['primer_apellido']
        correo = request.form['correo']
        contraseña = request.form['contrasena']  # Asegúrate de que el nombre coincide con el campo en el formulario HTML

        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO users (nombre, primer_apellido, correo, contraseña) VALUES (?, ?, ?, ?)',
                       (nombre, primer_apellido, correo, contraseña))
        conn.commit()
        conn.close()

        return redirect(url_for('registrarse'))

    return render_template('registrarse.html')

if __name__ == '__main__':
    create_table()  # Crear la tabla si no existeghghg
    app.run(debug=True)
