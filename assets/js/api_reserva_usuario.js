//Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
let URLid = window.location.search;
let params = new URLSearchParams(URLid);
let dias_total = parseInt(params.get("cant_dias"));
let destino = params.get("destino");
const input_destino = document.getElementById("destino");
const input_cantDias = document.getElementById("cant_dias");
input_destino.value = destino;
input_cantDias.value = dias_total;
//API create
const urlCrearReserva = "http://julieta.pythonanywhere.com/api/reserva";
//formulario Reserva
const formulario = document.getElementById("form");
const inputs = document.getElementsByClassName("input");
const submit = document.getElementById("submit");
const modal = document.getElementById("modal");

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

    calcularEdad(formulario.fecha_nac.value);

    //validar Fec.Nac
    if (formulario.fecha_nac.value == null || formulario.fecha_nac.value == 0) {
      document.getElementById("errorFecha").innerText = "Campo obligatorio";
      formulario.fecha_nac.classList.add("error_input");
      formulario.fecha_nac.focus();
      return false;
    }

    //Validar telefono
    if (formulario.telefono.value.length == 0) {
      document.getElementById("errorTelefono").innerText = "Campo obligatorio";
      formulario.telefono.classList.add("error_input");
      formulario.telefono.focus();
      return false;
    }
    //Validar Direccion
    if (formulario.direccion.value.length == 0) {
      document.getElementById("errorDireccion").innerText = "Campo obligatorio";
      formulario.direccion.classList.add("error_input");
      formulario.direccion.focus();
      return false;
    }
    //Validar CIudad
    if (formulario.ciudad.value.length == 0) {
      document.getElementById("errorCiudad").innerText = "Campo obligatorio";
      formulario.ciudad.classList.add("error_input");
      formulario.ciudad.focus();
      return false;
    }
    //Validar Provincia
    if (formulario.provincia.value.length == 0) {
      document.getElementById("errorProvincia").innerText = "Campo obligatorio";
      formulario.provincia.classList.add("error_input");
      formulario.provincia.focus();
      return false;
    }
    //Validar CP
    if (formulario.cp.value.length == 0) {
      document.getElementById("errorCp").innerText = "Campo obligatorio";
      formulario.cp.classList.add("error_input");
      formulario.cp.focus();
      return false;
    }

    //validar cant Reserva
    if (formulario.cantidad.value == "") {
      document.getElementById("errorCantidad").innerText =
        "Debe seleccionar la cantidad de personas";
      formulario.cantidad.classList.add("error_input");
      formulario.cantidad.focus();
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
    reserva_cliente();
  });
}

validar(formulario);
//Validar fechaNac si es mayor a 18
const calcularEdad = (fechaNacimiento) => {
  const fechaActual = new Date();
  const anoActual = parseInt(fechaActual.getFullYear());
  const mesActual = parseInt(fechaActual.getMonth()) + 1;
  const diaActual = parseInt(fechaActual.getDate());

  const anoNacimiento = parseInt(String(fechaNacimiento).substring(0, 4));
  const mesNacimiento = parseInt(String(fechaNacimiento).substring(5, 7));
  const diaNacimiento = parseInt(String(fechaNacimiento).substring(8, 10));

  if (anoActual - anoNacimiento < 18) {
    document.getElementById("errorFecha").innerText =
      "Seleccione Fecha de Nacimiento Correcta - Debe ser Mayor de 18 años";
    formulario.fecha_nac.classList.add("error_input");
    formulario.fecha_nac.focus();
    return false;
  }

  if (anoActual - anoNacimiento == 18) {
    if (mesActual - mesNacimiento < 0) {
      document.getElementById("errorFecha").innerText =
        "Seleccione Fecha de Nacimiento Correcta - Debe ser Mayor de 18 años";
      formulario.fecha_nac.classList.add("error_input");
      formulario.fecha_nac.focus();
      return false;
    } else if (mesActual - mesNacimiento == 0) {
      if (diaActual - diaNacimiento < 0) {
        document.getElementById("errorFecha").innerText =
          "Seleccione Fecha de Nacimiento Correcta - Debe ser Mayor de 18 años";
        formulario.fecha_nac.classList.add("error_input");
        formulario.fecha_nac.focus();
        return false;
      }
    }
  }
};

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

const reserva_cliente = () => {
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const email = document.getElementById("email");
  const dni = document.getElementById("dni");
  const fecha_nac = document.getElementById("fecha_nac");
  const telefono = document.getElementById("telefono");
  const direccion = document.getElementById("direccion");
  const ciudad = document.getElementById("ciudad");
  const provincia = document.getElementById("provincia");
  const cp = document.getElementById("cp");
  const cant_personas = document.getElementById("cantidad");
  const fecha_reserva = document.getElementById("fecha_reserva");

  //obtenemos radio checked*/
  const medio_pago = document.querySelector('input[name="medio_pago"]:checked');

  fetch(urlCrearReserva, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre.value,
      apellido: apellido.value,
      email: email.value,
      dni: dni.value,
      fecha_nac: fecha_nac.value,
      telefono: telefono.value,
      direccion: direccion.value,
      ciudad: ciudad.value,
      provincia: provincia.value,
      cp: cp.value,
      cant_personas: cant_personas.value,
      destino: destino,
      fecha_reserva: fecha_reserva.value,
      cantidad_dias: dias_total,
      medio_pago: medio_pago.value.toUpperCase(),
    }),
  })
    .then((response) => console.log(response.json()))
    .then((data) => {
      const nuevaReserva = [];
      //agregamos al arreglo la data q creamos
      nuevaReserva.push(data);

      Swal.fire({
        icon: "success",
        title: "Reserva Guardada con exito",
        showConfirmButton: false,
        timer: 1800,
      })

        .then((response) => (window.location.href = "../"))
        .catch((error) => console.log(error));
    });
};
