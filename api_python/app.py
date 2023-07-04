from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import date

app = Flask(__name__)
CORS(app)


# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Root1234@localhost:3306/rumbo_travel'
#driver mysql://user:password@host:port/database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #para que no salga un warning

db = SQLAlchemy(app) #instancia de la base de datos
ma = Marshmallow(app) #instancia de la serializacion

#PAQUETES
#Modelo de la base de datos
class Paquetes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destino = db.Column(db.String(70), unique=True)
    cant_dias = db.Column(db.Integer)
    cant_noches = db.Column(db.Integer)
    precio = db.Column(db.Integer)
    imagen = db.Column(db.String(100))
    destacado = db.Column(db.String(50))

    def __init__(self, destino, cant_dias,cant_noches,precio,imagen,destacado):
        self.destino = destino
        self.cant_dias = cant_dias
        self.cant_noches= cant_noches
        self.precio = precio
        self.imagen = imagen
        self.destacado = destacado

#Modelo de la base de datos
with app.app_context():
    db.create_all() #crea las tablas en la base de datos

class PaqueteSchema(ma.Schema):
    class Meta:
        fields = ('id', 'destino','cant_dias','cant_noches', 'precio', 'imagen', 'destacado')

paquete_schema = PaqueteSchema()
paquetes_schema = PaqueteSchema(many=True)

#RESERVAS
#Modelo de la base de datos
class Reservas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(70), unique=True)
    apellido = db.Column(db.String(70), unique=True)
    email = db.Column(db.String(70), unique=True)
    dni = db.Column(db.Integer)
    fecha_nac = db.Column(db.Date)
    telefono = db.Column(db.Integer)
    direccion = db.Column(db.String(50))
    ciudad = db.Column(db.String(50))
    provincia = db.Column(db.String(50))
    cp = db.Column(db.String(50))
    cant_personas = db.Column(db.Integer)
    fecha_reserva = db.Column(db.Date)
    destino = db.Column(db.String(50))
    fecha_inicio = db.Column(db.Date)
    cant_dias = db.Column(db.Integer)
    medio_pago= db.Column(db.String(50))

    def __init__(self,nombre,apellido,email,dni,fecha_nac,telefono,direccion,ciudad,provincia,cp,cant_personas,fecha_reserva,destino,fecha_inicio,cant_dias,medio_pago):
        self.nombre = nombre
        self.apellido = apellido
        self.email= email
        self.dni = dni
        self.fecha_nac = fecha_nac
        self.telefono = telefono
        self.direccion = direccion
        self.ciudad = ciudad
        self.provincia = provincia
        self.cp = cp
        self.cant_personas = cant_personas
        self.fecha_reserva = fecha_reserva
        self.destino = destino
        self.fecha_inicio= fecha_inicio
        self.cant_dias = cant_dias
        self.medio_pago = medio_pago

#Modelo de la base de datos
with app.app_context():
    db.create_all() #crea las tablas en la base de datos
    
class ReservaSchema(ma.Schema):
    class Meta:
        fields = ('id','nombre','apellido','email','dni','fecha_nac','telefono','direccion','ciudad','provincia','cp','cant_personas','fecha_reserva','destino','fecha_inicio','cant_dias','medio_pago')

reserva_schema = ReservaSchema()
reservas_schema = ReservaSchema(many=True)

# Rutas
#PAQUETES
@app.route('/api/paquetes', methods=['GET'])
def get_paquetes():
    all_paquetes = Paquetes.query.all() #select * from paquetes
    result = paquetes_schema.dump(all_paquetes)
    return jsonify(result) #retorna todos los paquetes


@app.route('/api/paquete/<id>', methods=['GET'])
def get_paquete(id):
    paquete = Paquetes.query.get(id)
    return paquete_schema.jsonify(paquete) #retorna el paquete con el id especificado

@app.route('/api/paquete', methods=['POST'])
def create_paquete():
    print(request.json)
    destino = request.json['destino']
    cant_dias = request.json['cant_dias']
    cant_noches = request.json['cant_noches']
    precio = request.json['precio']
    imagen = request.json['imagen']
    destacado = request.json['destacado']
   # fecha_actual = db.func.now()


    new_paquete = Paquetes(destino,cant_dias,cant_noches, precio, imagen, destacado)
    db.session.add(new_paquete)
    db.session.commit()
    return paquete_schema.jsonify(new_paquete) #retorna el paquete creado

@app.route('/api/paquete/<id>', methods=['PUT'])
def update_paquete(id):
    paquete = Paquetes.query.get(id) #select * from paquete where id = id

    paquete.destino = request.json['destino']
    paquete.cant_dias = request.json['cant_dias']
    paquete.cant_noches = request.json['cant_noches']
    paquete.precio = request.json['precio']
    paquete.imagen = request.json['imagen']
    paquete.destacado = request.json['destacado']

    db.session.commit()
    return paquete_schema.jsonify(paquete) #retorna el paquete actualizado


@app.route('/api/paquete/<id>', methods=['DELETE'])
def delete_paquete(id): #BORRADO LOGICO
    paquete = Paquetes.query.get(id) #select * from paquete where id = id
    paquete.deleted_at = db.func.now()
    #si omito session.delete es un borrado logico no fisico...
    db.session.delete(paquete) #elimina el paquete, si es un borrado permanente/fisico
    db.session.commit()
    return paquete_schema.jsonify(paquete) #retorna el paquete eliminado

#RESERVAS
@app.route('/api/reservas', methods=['GET'])
def get_reservas():
    all_reservas = Reservas.query.all() #select * from reservas
    result = reservas_schema.dump(all_reservas)
    return jsonify(result) #retorna todos las reservas


@app.route('/api/reserva/<id>', methods=['GET'])
def get_reserva(id):
    reserva = Reservas.query.get(id)
    return reserva_schema.jsonify(reserva) #retorna la reserva con el id especificado


@app.route('/api/reserva', methods=['POST'])
def create_reserva():
    print(request.json)

    nombre = request.json['nombre']
    apellido = request.json['apellido']
    email = request.json['email']
    dni = request.json['dni']
    fecha_nac = request.json['fecha_nac']
    telefono = request.json['telefono']
    direccion = request.json['direccion']
    ciudad = request.json['ciudad']
    provincia = request.json['provincia']
    cp = request.json['cp']
    cant_personas = request.json['cant_personas']
    fecha_reserva = date.today()
    destino = request.json['destino']
    fecha_inicio = request.json['fecha_reserva']
    cant_dias = request.json['cantidad_dias']
    medio_pago= request.json['medio_pago']

    new_reserva = Reservas(nombre,apellido,email,dni,fecha_nac,telefono,direccion,ciudad,provincia,cp,cant_personas,fecha_reserva,destino,fecha_inicio,cant_dias,medio_pago)
    db.session.add(new_reserva)
    db.session.commit()
    return reserva_schema.jsonify(new_reserva) #retorna la reserva creada

@app.route('/api/reserva/<id>', methods=['PUT'])
def update_reserva(id):
    reserva = Reservas.query.get(id) #select * from reservas where id = id

    reserva.nombre = request.json['nombre']
    reserva.apellido = request.json['apellido']
    reserva.email = request.json['email']
    reserva.dni = request.json['dni']
    reserva.fecha_nac = request.json['fecha_nac']
    reserva.telefono = request.json['telefono']
    reserva.direccion = request.json['direccion']
    reserva.ciudad = request.json['ciudad']
    reserva.provincia = request.json['provincia']
    reserva.cp = request.json['cp']
    reserva.cant_personas = request.json['cant_personas']
    reserva.fecha_reserva = request.json['fecha_reserva']
    reserva.destino = request.json['destino']
    reserva.fecha_inicio = request.json['fecha_inicio']
    reserva.cant_dias = request.json['cant_dias']
    reserva.medio_pago= request.json['medio_pago']

    db.session.commit()
    return reserva_schema.jsonify(reserva) #retorna la reserva actualizada


@app.route('/api/reserva/<id>', methods=['DELETE'])
def delete_reserva(id): #BORRADO LOGICO
    reserva = Reservas.query.get(id) #select * from reserva where id = id
    #reserva.deleted_at = db.func.now()
    #si omito session.delete es un borrado logico no fisico...
    db.session.delete(reserva) #elimina la reserva, si es un borrado permanente/fisico
    db.session.commit()
    return reserva_schema.jsonify(reserva) #retorna la reserva eliminada
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)