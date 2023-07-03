#servidor
from flask import Flask  
from flask import render_template
from flask import redirect #
from flaskext.mysql import MySQL   #mysql para python
from flask import request # Metodo para obtener datos de los formularios
from flask_cors import CORS
from flask import jsonify 
from datetime import date
#from markupsafe import escape
#creamos una app en flash
#creamos el objeto y instanciamos la clase
app =Flask(__name__) #flask constructor creo la instancia de flask i
#instancio la app en Flask reutilizando la clase de Flask
#mysql = MySQL()#creamos el objeto, una instancia de mysql
 
CORS(app)  # PERMITE QUE SE PUEDA CONSUMIR LA API DESDE CUALQUIER DOMINIO

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*" # <- You can change "*" for a domain for example "http://localhost"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE"
    response.headers["Access-Control-Allow-Headers"] = "Accept,Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response

#config a donde nos conectamos
mysql = MySQL() # Creo la instancia de MySQL
app.config['MYSQL_DATABASE_HOST'] = 'localhost' # Defino el host
app.config['MYSQL_DATABASE_USER'] = 'root' # Defino el usuario
app.config['MYSQL_DATABASE_PASSWORD'] = 'Root1234' # Defino la contraseña
app.config['MYSQL_DATABASE_DB'] = 'rumbo_travel' # Defino la base de datos
app.config['MYSQL_DATABASE_PORT'] = 3306
#inicializamos mysql
mysql.init_app(app) #conecto con bd inicializo la aplicacion

 


#PAQUETES
@app.route('/api/paquetes/', methods=['GET']) 
def paquetes():

    sql = 'SELECT id,destino,cant_dias,precio,destacado FROM paquetes;' # Consulta SQL

    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta

    data_paquetes = cursor.fetchall() # Obtenemos los datos de la consulta
 
    cursor.close() # Cierro el cursor
    return jsonify(data_paquetes)
   # return render_template('movies/index.html', data_jinja_movies=data_movies) # Renderizamos el template


@app.route('/api/paquetes/all', methods=['GET']) 
def paquetesAll():

    sql = 'SELECT id,destino,cant_dias,cant_noches,precio,imagen,destacado FROM paquetes;' # Consulta SQL

    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta

    data_paquetes = cursor.fetchall() # Obtenemos los datos de la consulta
    cursor.close() # Cierro el cursor
    return jsonify(data_paquetes)


@app.route('/api/paquetes/eliminar/<id>', methods=['DELETE']) # Creamos la ruta para eliminar peliculas
def delete(id): 

    sql = "DELETE FROM `paquetes` where id= " + id + ";" # Consulta SQL
    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta
    data = cursor.fetchone()
    print(data)
    conn.commit() # Guardamos los cambios
    return jsonify(data)

#RESERVAS
@app.route('/api/reservas', methods=['GET'])
def reservas():

    sql = 'SELECT id,nombre,apellido,dni,fecha_reserva,destino,fecha_inicio FROM reservas;' # Consulta SQL

    conn = mysql.connect() 
    cursor = conn.cursor()
    cursor.execute(sql) 

    data_reservas = cursor.fetchall() 
    cursor.close() # Cierro el cursor
    return jsonify(data_reservas)




@app.route('/api/reservas/create', methods=['POST']) # Creamos la ruta para almacenar reserva cliente
def create_reserva(): # Función para almacenar cliente
    data = request.get_json() # OBTENEMOS JSON que trae de javascripts cargado en la pagina
  #  print(data)
    nombre = data['nombre']
    apellido = data['apellido']
    email = data['email']
    dni =data['dni']
    fecha_nac=data['fecha_nac']
    telefono=data['telefono']
    direccion=data['direccion']
    ciudad=data['ciudad']
    provincia=data['provincia']
    cp=data['cp']
    cant_personas=data['cant_personas']
    destino=data['destino']
    #fecha de reserva es now() actual
    fecha_reserva=data['fecha_reserva']
    cantidad_dias=data['cantidad_dias']
    medio_pago=data['medio_pago']
    fecha = date.today()
   
    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute("INSERT INTO reservas (nombre,apellido,email,dni,fecha_nac,telefono,direccion,ciudad,provincia,cod_postal,cant_personas,fecha_reserva,destino,fecha_inicio,cant_dias,forma_pago) VALUES (%s, %s,%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                     (nombre,apellido,email,dni,fecha_nac,telefono,direccion,ciudad,provincia,cp,cant_personas,fecha,destino,fecha_reserva,cantidad_dias,medio_pago)) # Ejecutamos la consulta
                     
    #data = cursor.fetchone()
    conn.commit() # Guardamos los cambios
    cursor.close()
    conn.close()
    #print(data,nombre,apellido)
    #print(nombre,apellido,email,dni,fecha_nac,telefono,direccion,ciudad,provincia,cp,cant_personas,destino,fecha_reserva,cantidad_dias,medio_pago)
    #print(dni,nombre,apellido,edad,email)
    return jsonify("Respuesta: OK")# Retornamos un mensaje de exito

@app.route('/api/reservas/eliminar/<id>', methods=['DELETE']) #
def delete_reserva(id): 

    sql = "DELETE FROM `reservas` where id= " + id + ";" 
    conn = mysql.connect()
    cursor = conn.cursor() 
    cursor.execute(sql)
    data = cursor.fetchone()
    print(data)
    conn.commit() # Guardamos los cambios
    return jsonify(data)


# si el archivo principal es igual a main correlo en localhost
if __name__ == '__main__':  #
    app.run(debug=True, port=5000)

"""
@app.route('/api/cliente/edit/<int:id>', methods=['PUT'])# Creamos la ruta para almacenar cliente
def update_user(id):
  
   data = request.get_json()
   dni = data['dni']
   nombre = data['nombre']
   apellido = data['apellido']
   edad = data['edad']
   email = data['email']
   """
""" conn = mysql.connect() # Conexión a la base de datos
   cursor = conn.cursor() # Cursor de la base de datos """
"""  cursor.execute("UPDATE clientes SET dni = %s, nombre = %s, apellido = %s, edad = %s, email = %s WHERE id = %s",
                (id,nombre,apellido,edad,email, id))
   # updated_user = cursor.fetchone()
    #print(update_user)
   conn.commit()
   cursor.close()
   conn.close()
    if updated_user is None:
        return jsonify({'message': 'User not found'}), 404 """
   
 #  sql = ("UPDATE clientes SET dni = %s, nombre = %s, apellido = %s, edad = %s, email = %s WHERE id = %s")
  
"""conn = mysql.connect() # Conexión a la base de datos
   cursor = conn.cursor() # Cursor de la base de datos
   cursor.execute("UPDATE clientes SET dni = %s, nombre = %s, apellido = %s, edad = %s, email = %s WHERE id = %s",(dni,nombre,apellido,edad,email,dni)) # Ejecutamos la consulta
  # print(data)
  # print(id)
  # print(dni)
  # print(edad)
   #data = cursor.fetchone()
   conn.commit() # Guardamos los cambios
   cursor.close()
   conn.close()
   print(data)
   return jsonify("Respuesta: OK")"""

"""
@app.route('/create') # Creamos la ruta para crear peliculas
def create(): # Función para renderizar el template/html de crear peliculas
    return render_template('movies/create.html')



"""