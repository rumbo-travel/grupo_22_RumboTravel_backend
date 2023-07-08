//Esta es la instruccion para tomar el id del URL detalle.html?id=<identificador>
const URLid = window.location.search;
const params = new URLSearchParams(URLid);
const id = parseInt(params.get("id"));
const urlPaquete = "http://127.0.0.1:5000/api/paquete/";
const urlPaqueteAlta = "http://127.0.0.1:5000/api/paquete";
const input_destino = document.getElementById("destino")
const input_cant_dias = document.getElementById("cant_dias")
const input_cant_noches = document.getElementById("cant_noches")
const input_precio = document.getElementById("precio")
const input_imagen= document.getElementById("imagen")
const input_destacado = document.getElementById("destacado")
const form =document.getElementById('form')
const inputs = document.getElementsByClassName("input");

const iniciar = () =>{
    if(URLid)
    {
        console.log("modificacion")
        cargarPaquetes()
        
    }else{
        console.log("alta")
    }
}

iniciar()
validar(form)


function guardar(){
   // form.addEventListener('submit', (e)=>{
    //     e.preventDefault()
         if(URLid)
         {
             modificacion()             
         }else{
             alta()
         }
  //  })
}

function cargarPaquetes (){
    fetch(urlPaquete+id)
    .then( response => response.json() )
    .then( data =>
        {
            input_destino.value = data.destino;
            input_cant_dias.value =data.cant_dias;
            input_cant_noches.value=data.cant_noches;
            input_precio.value = data.precio;
            input_imagen.value =data.imagen;
            input_destacado.value=data.destacado;
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
  function validar(form) {
   
      form.addEventListener("submit", (e) => {
      limpiarErrores();
      e.preventDefault();
      console.log("validar")
  
      
      //validacion destino
      if (form.destino.value.length == 0) {
        document.getElementById("errorDestino").innerText = "Campo obligatorio";
        form.destino.classList.add("error_input");
        form.destino.focus();
        return false;
      }

      if (form.cant_dias.value.length == 0) {
        document.getElementById("errorCant_dias").innerText = "Campo obligatorio";
        form.cant_dias.classList.add("error_input");
        form.cant_dias.focus();
        return false;
      }

      if (form.cant_noches.value.length == 0) {
        document.getElementById("errorCant_noches").innerText = "Campo obligatorio";
        form.cant_noches.classList.add("error_input");
        form.cant_noches.focus();
        return false;
      }

      if (form.precio.value.length == 0) {
        document.getElementById("errorPrecio").innerText = "Campo obligatorio";
        form.precio.classList.add("error_input");
        form.precio.focus();
        return false;
      }

      if (form.imagen.value.length == 0) {
        document.getElementById("errorImagen").innerText = "Campo obligatorio";
        form.imagen.classList.add("error_input");
        form.imagen.focus();
        return false;
      }

      //validar destacado
      if (form.destacado.value == "") {
        document.getElementById("errorDestacado").innerText =
          "el campo Destacado no puede estar vacio";
        form.destacado.classList.add("error_input");
        form.destacado.focus();
        return false;
      }

        guardar()
    })
}

function alta(){
    fetch(urlPaqueteAlta, {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            destino: input_destino.value,
            cant_dias:input_cant_dias.value,
            cant_noches:input_cant_noches.value,
            precio:input_precio.value,
            imagen:input_imagen.value,
            destacado:input_destacado.value

        })
    })
    .then((response) => console.log(response.json()))
    .then((data) => {
      const nuevoPaquete = [];
      //agregamos al arreglo la data q creamos
      nuevoPaquete.push(data);

      Swal.fire({
        icon: "success",
        title: "Nuevo Paquete guardado con exito",
        showConfirmButton: false,
        timer: 1800,
      })

        .then((response) => (window.location.href = "./admin_paquetes.html"))
        .catch((error) => console.log(error));
    });
};

function modificacion(){
    fetch(urlPaquete+id, {
        method: 'PUT',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
            destino: input_destino.value,
            cant_dias:input_cant_dias.value,
            cant_noches:input_cant_noches.value,
            precio:input_precio.value,
            imagen:input_imagen.value,
            destacado:input_destacado.value

        })
    })
    .then((response) => console.log(response.json()))
    .then((data) => {
      const nuevoPaquete = [];
      //agregamos al arreglo la data q creamos
      nuevoPaquete.push(data);

      Swal.fire({
        icon: "success",
        title: "Paquete modificado con exito",
        showConfirmButton: false,
        timer: 1800,
      })

        .then((response) => (window.location.href = "./admin_paquetes.html"))
        .catch((error) => console.log(error));
    });
};


