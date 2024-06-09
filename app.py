from flask import Flask, render_template, request, redirect, url_for, jsonify, session
import sqlite3
from flask_cors import CORS
import sqlite3
from hashlib import sha256
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

 # Configuración del servidor SMTP
smtp_server = "smtp.outlook.com"
smtp_port = 587
smtp_username = "cinekoreal@outlook.com"
smtp_password = "ksrsqcqwsjccixnc"


CORS(app)
# Configuración de la base de datos
def init_sqlite_db():
    conn = sqlite3.connect('database.db')
    print("Base de datos abierta exitosamente")
    
    conn.execute('CREATE TABLE IF NOT EXISTS usuarios (nombre TEXT, apellido TEXT, correo TEXT, contrasena TEXT)')
    print("Tabla creada exitosamente")
    conn.close()

init_sqlite_db()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        try:
            nombre = request.form['nombre']
            apellido = request.form['apellido']
            correo = request.form['correo']
            contrasena = request.form['contrasena']

            contrasena_encriptada = sha256(contrasena.encode()).hexdigest()

            with sqlite3.connect('database.db') as con:
                cur = con.cursor()

                # Verificar si el correo ya está registrado
                cur.execute("SELECT * FROM usuarios WHERE correo = ?", (correo,))
                user = cur.fetchone()

                if user:
                    msg = "El correo ya está asociado con otra cuenta."
                    return render_template('resultado.html', msg=msg, msg_type='opciones', correo=correo, nombre=nombre, apellido=apellido, contrasena=contrasena)

                cur.execute("INSERT INTO usuarios (nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?)", 
                            (nombre, apellido, correo, contrasena_encriptada))
                con.commit()

                # Detalles del correo electrónico
                remitente = "cinekoreal@outlook.com"
                destinatario = correo
                asunto = "Gracias por registrarte"
                

                # Ruta de la imagen que deseas incrustar (reemplaza con la ruta correcta)
                poster1 = "static/img/Cartelera/Poster_dune.jpg"
                poster2 = "static/img/Cartelera/Poster_endGame.jpg"
                poster3 = "static/img/Cartelera/Poster_Interstellar.jpg"
                poster4 = "static/img/Cartelera/Poster_laBallena.jpg"

                # Leer las imágenes y crear objetos MIMEImage con identificadores únicos
                with open(poster1, "rb") as file:
                    poster1_image = MIMEImage(file.read())
                    poster1_image.add_header("Content-ID", "<poster1>")

                with open(poster2, "rb") as file:
                    poster2_image = MIMEImage(file.read())
                    poster2_image.add_header("Content-ID", "<poster2>")

                with open(poster3, "rb") as file:
                    poster3_image = MIMEImage(file.read())
                    poster3_image.add_header("Content-ID", "<poster3>")

                with open(poster4, "rb") as file:
                    poster4_image = MIMEImage(file.read())
                    poster4_image.add_header("Content-ID", "<poster4>")

                # Crear el objeto del mensaje
                mensaje = MIMEMultipart()
                mensaje["From"] = remitente
                mensaje["To"] = destinatario
                mensaje["Subject"] = asunto

                # Crear el contenido HTML del mensaje con la imagen incrustada
                html = f"""
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Gracias por unirte a Cineko</title>
                    <style>
                        body {{
                            font-family: Helvetica, Arial, sans-serif;
                            background-color: #f9f9f9;
                            color: #333;
                            text-align: center;
                            padding: 2rem;
                        }}
                        .container {{
                            background-color: #fff;
                            padding: 1.2rem;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            max-width: 50rem;
                            margin: auto;
                        }}
                        .header {{
                            background-color: #313b44;
                            color: #fff;
                            padding: 10px;
                            border-radius: 10px 10px 0 0;
                        }}
                        .footer {{
                            background-color: #934c3f;
                            color: #fff;
                            padding: 10px;
                            border-radius: 0 0 10px 10px;
                            font-size: 0.8em;
                        }}
                        .peliculas {{
                            padding: 20px;
                            background-color: #e1ddc3;
                        }}
                        .tituloP {{
                            background-color: #675729;
                            color: #fff;
                            padding: 10px;
                            margin-bottom: 0rem;
                            text-transform: uppercase;
                        }}
                        .image-container {{
                            width: 100%;
                            display: table;
                            border-spacing: 20px;
                        }}
                        .image-container td {{
                            padding: 10px;
                            vertical-align: top;
                        }}
                        .image-container img {{
                            width: 100%;
                            max-width: 300px;
                            height: 100%;
                            max-height: 500px;
                            object-fit: cover;
                            transition: transform 0.2s;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            border-radius: 10px;
                        }}
                        .image-container img:hover {{
                            transform: scale(1.04);
                        }}
                        .titulo-pelicula {{
                            font-weight: bold;
                            text-transform: uppercase;
                            color: #333;
                            margin-top: 5px;
                        }}
                        .content {{
                            margin: 20px 0;
                        }}
                        a {{
                            text-decoration: none;
                            color: inherit;
                        }}
                        a:hover {{
                            text-decoration: underline;
                        }}
                    </style>
                </head>
                <body class="cuerpoGmail">
                    <div class="container">
                        <div class="header">
                            <h1>🎉 ¡Bienvenido a Cineko Real! 🎉</h1>
                        </div>
                        <div class="content">
                            <p>Hola {nombre} {apellido} 👋,</p>
                            <p>¡Gracias por ser parte de Cineko! Estamos encantados de tenerte con nosotros. 🫂</p>
                            <p>Prepárate para disfrutar de la mejor experiencia en nuestras salas de cine. ¡No te pierdas nuestras
                                últimas proyecciones y eventos especiales!</p>
                            <p>¡Nos vemos en el cine!🍿</p>
                        </div>
                        <h2 class="tituloP">Pelis Destacadas🎬</h2>
                        <div class="peliculas">
                            <table class="image-container">
                                <tr>
                                    <td>
                                        <a href="http://127.0.0.1:5500/templates/peliculas/dune.html" target="_blank">
                                            <img src="cid:poster1" alt="Dune">
                                            <p class="titulo-pelicula">Dune</p>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="http://127.0.0.1:5500/templates/peliculas/endGame.html" target="_blank">
                                            <img src="cid:poster2" alt="endGame">
                                            <p class="titulo-pelicula">Avengers: Endgame</p>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="http://127.0.0.1:5500/templates/peliculas/interstellar.html" target="_blank">
                                            <img src="cid:poster3" alt="Interstellar">
                                            <p class="titulo-pelicula">Interstellar</p>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="http://127.0.0.1:5500/templates/peliculas/laballena.html" target="_blank">
                                            <img src="cid:poster4" alt="laBallena">
                                            <p class="titulo-pelicula">La Ballena</p>
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="footer">
                            <p>Si tienes alguna pregunta, no dudes en contactarnos en <a href="mailto:cinekoreal@outlook.com" style="color: #fff;">
                                    cinekoreal@outlook.com</a></p>
                            <p>Copyright © 2024 CineKo Real. All Rights Reserved</p>
                        </div>
                    </div>
                </body>
                </html>

                """

                # Adjuntar el contenido HTML al mensaje
                mensaje.attach(MIMEText(html, "html"))

                # Adjuntar las imágenes al mensaje
                mensaje.attach(poster1_image)
                mensaje.attach(poster2_image)
                mensaje.attach(poster3_image)
                mensaje.attach(poster4_image)

                try:
                    # Crear una conexión SMTP segura
                    server = smtplib.SMTP(smtp_server, smtp_port)
                    server.starttls()
                    
                    
                    # Iniciar sesión en el servidor SMTP
                    server.login(smtp_username, smtp_password)
                    
                    # Enviar el correo electrónico
                    server.send_message(mensaje)

                    print("Correo electrónico enviado correctamente.")
                    
                    # Redirigir a la página de éxito con un mensaje
                    msg = "Registro exitoso. Se ha enviado un correo de confirmación."
                    return redirect(url_for('success', msg=msg, msg_type='register_success'))
                except Exception as e:
                    print("Ocurrió un error al enviar el correo electrónico:")
                    print(str(e))
                    msg = "Registro exitoso, pero hubo un problema al enviar el correo de confirmación."
                    return redirect(url_for('success', msg=msg, msg_type='register_success'))
                finally:
                    # Cerrar la conexión SMTP
                    server.quit()
        except Exception as e:
            msg = "Error en el registro: " + str(e)
            return redirect(url_for('error', msg=msg))
        
@app.route('/continue_register', methods=['POST'])
def continue_register():
    try:
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        contrasena_encriptada = sha256(contrasena.encode()).hexdigest()

        with sqlite3.connect('database.db') as con:
            cur = con.cursor()
            # Actualizar el registro con la nueva información
            cur.execute("INSERT INTO usuarios (nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?)", 
                        (nombre, apellido, correo, contrasena_encriptada))
            con.commit()
            msg = "Registro completado exitosamente. Por favor, inicia sesión."
            return redirect(url_for('success', msg=msg, msg_type='register_success'))

    except Exception as e:
        msg = "Error al continuar el registro: " + str(e)
        return redirect(url_for('error', msg=msg))

def is_authenticated():
    return 'user_id' in session

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        correo = request.form['correo']
        contrasena = request.form['contrasena']
        contrasena_encriptada = sha256(contrasena.encode()).hexdigest()

        try:
            with sqlite3.connect('database.db') as con:
                cur = con.cursor()
                cur.execute("SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?", (correo, contrasena_encriptada))
                user = cur.fetchone()

                if user: 
                    session['user_id'] = user[0]
                    return redirect(url_for('carrito'))
                else:
                    return redirect(url_for('login', error="Correo o contraseña incorrectos"))
        
        except Exception as e:
            return redirect(url_for('login', error="Error al iniciar sesión: " + str(e)))

@app.route('/carrito')
def carrito():
    if is_authenticated():
        return render_template('carrito.html')
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('get_logged_in_status'))

@app.route('/get_logged_in_status')
def get_logged_in_status():
    logged_in = is_authenticated()
    print("Logged in:", logged_in)
    return jsonify({'logged_in': logged_in})

@app.route('/success')
def success():
    msg = request.args.get('msg', 'Operación exitosa')
    msg_type = request.args.get('msg_type', 'success')  # Obtener el tipo de mensaje
    return render_template('resultado.html', msg=msg, msg_type=msg_type)

@app.route('/error')
def error():
    msg = request.args.get('msg', 'Ocurrió un error')
    return render_template('resultado.html', msg=msg, msg_type='error')

if __name__ == '__main__':
    app.run(debug=True)