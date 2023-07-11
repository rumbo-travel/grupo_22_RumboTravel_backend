//PAQUETES
const url = "http://julieta.pythonanywhere.com/api/paquetes";
const url_eliminar = "http://julieta.pythonanywhere.com/api/paquete/";

const contenedor = document.querySelector("tbody");
let resultados = "";

//funcion para mostrar los resultados
const mostrar = (paquetes) => {
  resultados = "";
  let cont = 1;

  //validamos la cantidad de datos que trae de la BD
  // if(clientes.length >0)
  // {
  paquetes.forEach((paquete) => {
    resultados += `<tr>
                                <td class="ocultar">${paquete.id}</td>
                                <td>${cont++}</td>
                                <td>${paquete.destino}</td>
                                <td>${paquete.cant_dias}</td>
                                <td>${paquete.cant_noches}</td>
                                <td>${paquete.destacado}</td>
                              
                               
                                <td>
                               <a class="btnEditar btn btn-primary me-1" href="./alta_paquetes.html?id=${
                                 paquete.id
                               }" title="Modificar"></a>
                                <button class="btnBorrar btn btn-danger"title="Eliminar"></button>
                                </td>
                           </tr>
                        `;
  });
  contenedor.innerHTML = resultados;
  //  }else{  //sino trajo datos da vacia la busqueda

  //      busquedaVacia()
  //   }
};

//Procedimiento Mostrar
const inicioPaquetes = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => mostrar(data))
    .catch((error) => console.log(error));
};

inicioPaquetes();

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

  Swal.fire({
    title: "Estas esta seguro que desea eliminar el paquete seleccionado?",
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
              title: "El paquete seleccionado se elimino correctamente",
              showConfirmButton: false,
              timer: 1500,
            }),
          setTimeout(function () {}),
          1200
        )
        .then((response) => location.reload())
        .catch((error) => console.log(error));
    }
  });
});
