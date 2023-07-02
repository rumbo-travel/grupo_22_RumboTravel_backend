//formulario Comentario
const formulario = document.getElementById("form_comentario");
const inputs = document.getElementsByClassName("inputC");
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

function limpiarTxt() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

//validacion formulario comentario
function validarForm(formulario) {
  formulario.addEventListener("submit", (e) => {
    limpiarErrores();
    e.preventDefault();
    //console.log("click");

    //validacion nombre
    if (formulario.nombreC.value.length == 0) {
      document.getElementById("errorNombre").innerText = "Campo obligatorio";
      formulario.nombreC.classList.add("error_input");
      formulario.nombreC.focus();
      return false;
    }

    //validacion email
    if (formulario.emailC.value.length == 0) {
      document.getElementById("errorEmail").innerText = "Campo obligatorio";
      formulario.emailC.classList.add("error_input");
      formulario.emailC.focus();
      return false;
    }

    //expresion regular para validar un email
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(formulario.emailC.value)) {
      document.getElementById("errorEmail").innerText = "Email Invalido";
      formulario.emailC.classList.add("error_input");
      formulario.emailC.focus();
      return false;
    }

    //validacion comentario
    if (formulario.comentario.value.length == 0) {
      document.getElementById("errorComentario").innerText =
        "Campo obligatorio";
      formulario.comentario.classList.add("error_input");
      formulario.comentario.focus();
      return false;
    }

    modal.style.display = "flex";
    modal.style.opacity = 1;
    limpiarTxt();
    document.querySelector(".btn").addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  });
}

validarForm(formulario);
