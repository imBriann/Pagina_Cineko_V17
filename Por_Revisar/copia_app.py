from flask import Flask, request, redirect, url_for, render_template
import sqlite3

app = Flask(__name__)

# Ruta para la página de registro
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        repetir_contrasena = request.form['repetir_contrasena']

        # Validación simple de contraseña
        if contrasena != repetir_contrasena:
            return "Las contraseñas no coinciden"

        # Conectar a la base de datos
        conn = sqlite3.connect('database.db')
        cursor = conn.cursor()

        # Crear tabla si no existe
        cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            correo TEXT NOT NULL UNIQUE,
            contrasena TEXT NOT NULL
        )''')

        # Insertar los datos en la base de datos
        cursor.execute('''INSERT INTO usuarios (nombre, apellido, correo, contrasena)
                          VALUES (?, ?, ?, ?)''', (nombre, apellido, correo, contrasena))
        
        conn.commit()
        conn.close()

        return redirect(url_for('registro_exitoso'))

    return render_template('registrarse.html')

# Ruta para la página de registro exitoso
@app.route('/registro_exitoso')
def registro_exitoso():
    return "Registro exitoso"

if __name__ == '__main__':
    app.run(debug=True)
