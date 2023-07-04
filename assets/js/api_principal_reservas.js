/*Reserva*/
let div_reserva = document.querySelector(".div_reserva");
let span_suc = document.querySelector("span_sucursales");
const url_paquetes = "http://127.0.0.1:5000/api/paquetes";

let cargarPaquetes = () => {
  fetch(url_paquetes)
    .then((respuesta) => respuesta.json()) //formato en q se obtiene la info osea la respuesta
    .then((data) => {
      let titulos = {};
      //obtengo section del data
      data.map((element) => {
        //console.log(element[6])
        titulos[element.destacado] = element.destacado;
      });

      for (let clave in titulos) {
        // console.log(titulos[clave])

        //agregamos el titulo al div reserva
        div_reserva.appendChild(crearTitulo(titulos[clave]));

        //uso data-name para cada section - titulo
        let div_contenedor = document.querySelector(
          `[data-name ="${titulos[clave]}"]`
        );

        //recorro todo el data y si es igual al titulo lo inserto dentro
        data.filter((elemento) => {
          if (elemento.destacado === titulos[clave]) {
            //  console.log(elemento)
            let linea = crearLineaNueva(
              elemento.destacado,
              elemento.imagen,
              elemento.cant_dias,
              elemento.cant_noches,
              elemento.precio,
              elemento.destino
            );
            div_contenedor.appendChild(linea);
          }
        });
      }
    })
    .catch((err) => console.log(error)); //si hay error lo atajamos y mostramos x consola
};

cargarPaquetes();

//Metodo 1//
const crearLineaNueva = (
  section,
  imagen,
  cant_dias,
  cant_noches,
  precio,
  ciudad
) => {
  let div_item = document.createElement("div");
  div_item.classList.add("item");
  // let div_destacado = document.querySelector(".contenedor_destacado");
  div_item.innerHTML += `
                <div class="item">
                    <div class="card">
                        <img src="./assets/images/${section}/${imagen}" alt="">
                        <p class="p_dias"> ${cant_dias}dias - ${cant_noches}noches</p>
                        <p class="p_precio">${precio}</p>
                        <p class="p_ciudad">${ciudad}</p>
                        <a href="./pages/Reserva.html?destino=${ciudad}&cant_dias=${cant_dias}">Reserva</a>
                    </div>
                </div>`;

  return div_item;
};

const crearTitulo = (titulo) => {
  let div_titulo = document.createElement("div");
  div_titulo.innerHTML = "";
  div_titulo.innerHTML += `
 <div class="titulo_destacado">
     <span>${titulo}</span>
 </div>
 <div class="contenedor_destacado" data-name="${titulo}">
 </div>`;
  return div_titulo;
};
