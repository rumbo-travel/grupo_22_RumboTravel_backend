//Reserva
const url = "http://127.0.0.1:5000/api/reservas";
const url_eliminar = "http://127.0.0.1:5000/api/reservas/eliminar/";
const contenedor = document.querySelector("tbody");
let resultados = "";

//funcion para mostrar los resultados
const mostrar = (reservas) => {
  resultados = "";
  let cont = 1;
  //validamos la cantidad de datos que trae de la BD
  // if(reservas.length >0)
  // {
  reservas.forEach((reserva) => {
    resultados += `<tr>
                                <td>${cont++}</td>
                                <td>${reserva[5]}</td>
                                <td>${reserva[3]}</td>
                                <td>${reserva[1]}</td>
                                <td>${reserva[2]}</td>
                                <td>${parseDate(reserva[4])}</td>
                                <td>${parseDate(reserva[6])}</td>
                                <td>
                                <a class="btnEditar btn btn-primary me-1" href="./reserva_modificacion.html?id=${
                                  reserva[0]
                                }"></a>
                                <button class="btnBorrar btn btn-danger"></button>
                                </td>
                           </tr>
                        `;
  });
  contenedor.innerHTML = resultados;
};

//Procedimiento Mostrar
const inicioReservas = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch((error) => console.log(error));
};

inicioReservas();

function parseDate(date) {
  const formated = new Date(date);
  /*console.log(formated);
  console.log(
    formated.toLocaleDateString("es-ar", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  );*/
  //const formated2 = formated.split("-").reverse().join("-");
  // const reducido =formated2.toLocaleDateString("es-ar",{year: 'numeric', month: '2-digit', day: '2-digit' })
  // const fecha=`${formated.getDay()}/${formated.getMonth()}/${formated.getFullYear()}`
  // console.log(formated.getDay());
 //console.log(formated.getMonth() + 1);
 // console.log(formated.getFullYear());
  return formated.toLocaleDateString("es-ar", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const on = (element, event, selector, handler) => {
  //console.log(element)  //todo el documento captura
  //console.log(event)  //event pasa el evento clic q lo definimos en ON
  //console.log(selector) // selector captura la clase del btn a usar
  //console.log(handler)  //handler es un controlador jeecuta evento... acciones del usuario
  //muestra el handler lo q libera o dentro de la funcion eliminar...
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      //closet devuelve el mas cercano o asendiente al elemento actual sino devuelve null
      handler(e);
    }
  });
};
//borrar
on(document, "click", ".btnBorrar", (e) => {
  //captura un parentNode todo donde esta el btn clicliado
  //al usar 2 parentNode captura toda la fila completa donde esta el btn click presionado
  const fila = e.target.parentNode.parentNode;
  //primer elemento de la fila q es el id...
  //const id = fila.firstElementChild.innerHTML
  const id = fila.children[0].innerHTML;
  //console.log(id)
  Swal.fire({
    title: "Estas esta seguro que desea eliminar la reserva seleccionada?",
    //text: "Si se elimina No se puede recuperar!",
    icon: "error",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "btn btn-primary",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url_eliminar + id, {
        method: "DELETE",
      })
        .then(
          (data) =>
            Swal.fire({
              icon: "success",
              title: "La reserva seleccionada se elimino correctamente",
              showConfirmButton: false,
              timer: 1500,
            }),
          setTimeout(function () {}),
          1200
        ) //)
        .then((response) => location.reload())
        .catch((error) => console.log(error));
    }
  });
});
