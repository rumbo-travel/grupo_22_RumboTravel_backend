#servidor
from flask import Flask  
from flask import render_template
from flask import redirect #
from flaskext.mysql import MySQL   #mysql para python
from flask import request # Metodo para obtener datos de los formularios
from flask_cors import CORS
from flask import jsonify 
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
    response.headers["Access-Control-Allow-Headers"] = "Accept,Content-Type: application/json, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
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
@app.route('/api/paquetes', methods=['GET']) # Creamos la ruta para el index
def paquetes():

    sql = 'SELECT id,destino,cant_dias,precio,destacado FROM paquetes;' # Consulta SQL

    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta

    data_paquetes = cursor.fetchall() # Obtenemos los datos de la consulta
   # print(data_clientes)
    cursor.close() # Cierro el cursor
    return jsonify(data_paquetes)
   # return render_template('movies/index.html', data_jinja_movies=data_movies) # Renderizamos el template

#PAQUETES
@app.route('/api/paquetes/all', methods=['GET']) # Creamos la ruta para el index
def paquetesAll():

    sql = 'SELECT id,destino,cant_dias,cant_noches,precio,imagen,destacado FROM paquetes;' # Consulta SQL

    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta

    data_paquetes = cursor.fetchall() # Obtenemos los datos de la consulta
   # print(data_clientes)
    cursor.close() # Cierro el cursor
    return jsonify(data_paquetes)
   # return render_template('movies/index.html', data_jinja_movies=data_movies) # Renderizamos el template


#RESERVAS
@app.route('/api/reservas', methods=['GET']) # Creamos la ruta para el index
def reservas():

    sql = 'SELECT id,nombre,apellido,dni,fecha_reserva,destino,fecha_inicio FROM reservas;' # Consulta SQL

    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta

    data_reservas = cursor.fetchall() # Obtenemos los datos de la consulta
   # print(data_clientes)
    cursor.close() # Cierro el cursor
    return jsonify(data_reservas)
   # return render_template('movies/index.html', data_jinja_movies=data_movies) # Renderizamos el template

# si el archivo principal es igual a main correlo en localhost
if __name__ == '__main__':  #
    app.run(debug=True, port=5000)
   # app.run(debug=True) #ejecuto la aplicacion en modo debug
   #ver si asi se config app.run(host='127.0.0.1',port=4000,pipdebug=True) #
    #conexion a la BD
"""
@app.route('/api/cliente/create', methods=['POST']) # Creamos la ruta para almacenar cliente
def create_cliente(): # Función para almacenar cliente
    data = request.get_json() # OBTENEMOS JSON que trae de javascripts cargado en la pagina
  #  print(data)
    dni =data['dni']
    nombre = data['nombre']
    apellido = data['apellido']
    edad = data['edad']
    email = data['email']
   # dni = request.form['dni']
   # nombre = request.form['nombre']
  #  apellido = request.form['apellido']
  #  edad = request.form['edad']
 #   email = request.form['email']
     
    sql = "INSERT INTO `clientes` (`dni`,`nombre`,`apellido`,`edad`,`email`) VALUES (" + dni + ",'" + nombre + "','" + apellido + "'," + edad + ",'" + email + "');" # Consulta SQL

    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta
   
    #data = cursor.fetchone()
    conn.commit() # Guardamos los cambios
    cursor.close()
    conn.close()
    print(data)
   # print(dni,nombre,apellido,edad,email)
    return jsonify("Respuesta: OK")# Retornamos un mensaje de exito

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
   return jsonify("Respuesta: OK")


@app.route('/api/cliente/delete/<id>', methods=['GET','POST','DELETE']) # Creamos la ruta para eliminar peliculas
def delete(id): 

    sql = "DELETE FROM `clientes` where dni= " + id + ";" # Consulta SQL
    conn = mysql.connect() # Conexión a la base de datos
    cursor = conn.cursor() # Cursor de la base de datos
    cursor.execute(sql) # Ejecutamos la consulta
    data = cursor.fetchone()
    print(data)
    conn.commit() # Guardamos los cambios
    return jsonify(data)
   # return "Pelicula elimina con exito " + id # Retornamos un mensaje de exito

@app.route('/create') # Creamos la ruta para crear peliculas
def create(): # Función para renderizar el template/html de crear peliculas
    return render_template('movies/create.html')



"""