import sqlite3

# Conectar a la base de datos (o crearla si no existe)
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Definir el nombre de la tabla que quieres eliminar
nombre_tabla = 'usuarios'

# Crear la consulta SQL para eliminar la tabla
consulta_eliminar_tabla = f"DROP TABLE IF EXISTS {nombre_tabla}"

# Ejecutar la consulta
try:
    cursor.execute(consulta_eliminar_tabla)
    print(f"Tabla '{nombre_tabla}' eliminada correctamente.")
except sqlite3.Error as error:
    print(f"Error al eliminar la tabla: {error}")
finally:
    # Cerrar la conexión
    conn.close()
