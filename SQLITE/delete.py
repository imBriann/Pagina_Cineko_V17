import sqlite3

# Conectar a la base de datos (creará la base de datos si no existe)
conn = sqlite3.connect('database.db')

# Crear un cursor
cursor = conn.cursor()

# Nombre de la tabla que quieres limpiar
nombre_de_la_tabla = 'usuarios'

# Eliminar todos los datos de la tabla
cursor.execute(f'DELETE FROM {nombre_de_la_tabla};')

# Confirmar los cambios
conn.commit()

# Cerrar la conexión
conn.close()
