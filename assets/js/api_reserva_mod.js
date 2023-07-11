//Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
const URLid = window.location.search;
const params = new URLSearchParams(URLid);
const id = parseInt(params.get("id"));
const urlReserva = "http://julieta.pythonanywhere.com/api/reserva/";
const input_nombre = document.getElementById("nombre")
const input_apellido = document.getElementById("apellido")
const input_email = document.getElementById("email")
const input_dni = document.getElementById("dni")
const input_telefono = document.getElementById("telefono")
const input_destino = document.getElementById("destino")
const input_cant_dias = document.getElementById("cant_dias")
const input_cant_personas = document.getElementById("cant_personas")
const input_fecha_reserva = document.getElementById("fecha_reserva")
const input_medio_pago = document.getElementById("medio_pago")
const formulario =document.getElementById('form')
const inputs = document.getElementsByClassName("input");

cargarReserva()
validar(form)


function cargarReserva (){
    fetch(urlReserva+id)
    .then( response => response.json() )
    .then( data =>
        {   input_nombre.value=data.nombre;
            input_apellido.value=data.apellido;
            input_email.value=data.email;
            input_dni.value=data.dni;
            input_telefono.value=data.telefono;
            input_destino.value = data.destino;
            input_cant_dias.value =data.cant_dias;
            input_cant_personas.value=data.cant_personas;
            input_fecha_reserva.value = data.fecha_inicio;
            input_medio_pago.value =data.medio_pago;
            
        } )
    .catch( error => console.log(error))
}

//limpiar Formulario
function limpiarErrores() {
    //guardo en var errores todos los elementos de clase error
    var errores = document.getElementsByClassName("error");
    
    //limpiamos
    for (var i = 0; i < errores.length; i++) {
      errores[i].innerHTML = "";
    }
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("error_input");
    }
  }
  
  //validacion formulario
function validar(formulario) {
    formulario.addEventListener("submit", (e) => {
      limpiarErrores();
      e.preventDefault();
  
      //validacion nombre
      if (formulario.nombre.value.length == 0) {
        document.getElementById("errorNombre").innerText = "Campo obligatorio";
        formulario.nombre.classList.add("error_input");
        formulario.nombre.focus();
        return false;
      }
      //validacion apellido
      if (formulario.apellido.value.length == 0) {
        document.getElementById("errorApellido").innerText = "Campo obligatorio";
        formulario.apellido.classList.add("error_input");
        formulario.apellido.focus();
        return false;
      }
  
      //validacion email
      if (formulario.email.value.length == 0) {
        document.getElementById("errorEmail").innerText = "Campo obligatorio";
        formulario.email.classList.add("error_input");
        formulario.email.focus();
        return false;
      }
  
      //expresion regular para validar un email
      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(formulario.email.value)) {
        document.getElementById("errorEmail").innerText = "Email Invalido";
        formulario.email.classList.add("error_input");
        formulario.email.focus();
        return false;
      }
  
      //vlidar DNI
      if (formulario.dni.value.length == 0) {
        document.getElementById("errorDni").innerText = "Campo obligatorio";
        formulario.dni.classList.add("error_input");
        formulario.dni.focus();
        return false;
      }
  
      //vlidar DNI
      if (formulario.dni.value.length < 7) {
        document.getElementById("errorDni").innerText = "Ingrese DNI Correcto";
        formulario.dni.classList.add("error_input");
        formulario.dni.focus();
        return false;
      }
  
      //Validar telefono
      if (formulario.telefono.value.length == 0) {
        document.getElementById("errorTelefono").innerText = "Campo obligatorio";
        formulario.telefono.classList.add("error_input");
        formulario.telefono.focus();
        return false;
      }

       //vlidar Destino
       if (formulario.destino.value.length == 0) {
        document.getElementById("errorDestino").innerText = "Campo obligatorio";
        formulario.destino.classList.add("error_input");
        formulario.destino.focus();
        return false;
      }
       //vlidar Cant Personas
       if (formulario.cant_personas.value.length == 0) {
        document.getElementById("errorCant_personas").innerText = "Campo obligatorio";
        formulario.cant_personas.classList.add("error_input");
        formulario.cant_personas.focus();
        return false;
      }
  
      //validar cant Reserva
      if (formulario.cant_dias.value == "") {
        document.getElementById("errorCant_dias").innerText =
          "Debe seleccionar la cantidad de personas";
        formulario.Cant_dias.classList.add("error_input");
        formulario.Cant_dias.focus();
        return false;
      }
  
      //Validar Fecha Reserva
      if (
        formulario.fecha_reserva.value == null ||
        formulario.fecha_reserva.value == 0
      ) {
        document.getElementById("errorReserva").innerText = "Campo obligatorio";
        formulario.fecha_reserva.classList.add("error_input");
        formulario.fecha_reserva.focus();
        return false;
      }
  
      //Validar Fecha Reserva correcta
      validarFechaReserva(formulario.fecha_reserva.value);
  
      //Validar Medio de Pago
      if (formulario.medio_pago.value == "") {
        document.getElementById("errorPago").innerText =
          "Debe seleccionar un medio de pago";
        return false;
      }
      //guardamos la reserva si esta todo OK
      modificacion_reserva();
    });
  }
  
  
  const validarFechaReserva = (fechaReserva) => {
    // Inicializamos a "fecha" como un objeto tipo "Date()".
    let fecha = new Date();
    // Transformamos a "fecha" en el formato "aaaa-mm-dd" de la fecha actual.
    let fechaActual =
      fecha.getFullYear() +
      "-" +
      String(fecha.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(fecha.getDate()).padStart(2, "0");
    // Comparamos si la fechaActual es igual a la fecha que recibirá como parámetro la función
    if (fechaActual >= fechaReserva) {
      // Si es igual  o mayor a la fecha seleccionada retornará esto.
      document.getElementById("errorReserva").innerText =
        "La fecha seleccionada no puede ser usada para reservar el paquete";
      formulario.fecha_reserva.classList.add("error_input");
      formulario.fecha_reserva.focus();
      return false;
    }
  };



function modificacion_reserva(){
    fetch(urlReserva+id, {
        method: 'PUT',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
            nombre: input_nombre.value,
            apellido: input_apellido.value,
            email: input_email.value,
            dni: input_dni.value,
            telefono: input_telefono.value,
            destino: input_destino.value,
            cant_dias:input_cant_dias.value,
            cant_personas:input_cant_personas.value,
            fecha_reserva:input_fecha_reserva.value,
            medio_pago:input_medio_pago.value,

        })
    })
    .then((response) => console.log(response.json()))
    .then((data) => {
      const nuevaReserva = [];
      //agregamos al arreglo la data q creamos
      nuevaReserva.push(data);

      Swal.fire({
        icon: "success",
        title: "Reserva modificada con exito",
        showConfirmButton: false,
        timer: 1800,
      })

        .then((response) => (window.location.href = "./admin_reservas.html"))
        .catch((error) => console.log(error));
    });
};


function parseDate(date){
    const formated = new Date(date)
    console.log(formated)
    console.log(formated.toLocaleDateString("es-ar",{year: 'numeric', month: '2-digit', day: '2-digit' }))
    //const formated2 = formated.split("-").reverse().join("-");
   // const reducido =formated2.toLocaleDateString("es-ar",{year: 'numeric', month: '2-digit', day: '2-digit' })
  // const fecha=`${formated.getDay()}/${formated.getMonth()}/${formated.getFullYear()}`
    console.log(formated.getDay())
    console.log(formated.getMonth()+1)
    console.log(formated.getFullYear())
   return formated.toLocaleDateString("es-ar",{year: 'numeric', month: '2-digit', day: '2-digit' });
}

