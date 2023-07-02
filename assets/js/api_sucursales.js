/*SUCURSALES*/
let div_suc = document.querySelector(".container_suc");
let span_suc = document.querySelector("span_sucursales")



let cargarSucursales = () => {
    fetch("../sucursales.json")
        .then(respuesta => respuesta.json()) //formato en q se obtiene la info osea la respuesta
        .then(sucursales => {
            div_suc.innerHTML = "";

            sucursales?.map(sucursal => {

                let linea = crearLineaNueva(sucursal.localidad, sucursal.link_maps, sucursal.direccion, sucursal.horario,
                    sucursal.telefono, sucursal.iframe);

                div_suc.appendChild(linea);
            })
        })
}


//evento clic
const eventoClick = (evento) => {
    let elemento_clickado = evento.target;
    // console.log(evento.target)
    if (elemento_clickado.classList.contains('span_sucursales')) {
        elemento_clickado.classList.toggle("active")
    } 
}


cargarSucursales();
div_suc.addEventListener("click", eventoClick);


//Metodo 1//
const crearLineaNueva = (localidad, link, direccion, horario, telefono, iframe) => {
    const section = document.createElement("section");
    section.classList.add("section_sucursales");

    section.innerHTML += `
    <span class="span_sucursales">${localidad}</span>
   <div class="item_sucursales">
        <div class="sucursales_detalle">
            <a href="${link}">${direccion}</a>
            <p class="p_sucursales">Horario de atencion:<br>${horario}</p>
            <p class="p_sucursales">Telefono: ${telefono}</p>
        </div>
        <div class="sucursales_iframe">
            <iframe
                src="${iframe}"
                width="350" height="350" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</section>`

    return section;

}

    //Metodo 2
/*
const crearLineaNueva = (localidad,link,direccion,horario,telefono,iframe) =>{
    const section = document.createElement("section");
    section.classList.add("section_sucursales");
     const span = document.createElement("span");
    span.classList.add("span_sucursales");
    span.id ="span_sucursales";
    span.innerText = localidad;
 
    const div_item = document.createElement("div");
    div_item.classList.add("item_sucursales");
 
    const div_detalle = document.createElement("div");
    div_detalle.classList.add("sucursales_detalle");
    const a = document.createElement("a");
    a.href = link;
    a.textContent = direccion;
    const p_1 = document.createElement("p");
    p_1.classList.add("p_sucursales");
    p_1.textContent ="Horario de atencion: " + horario;
    const p_2 = document.createElement("p");
    p_2.classList.add("p_sucursales");
    p_2.textContent ="Telefono: " + telefono;
    div_detalle.appendChild(a)
    div_detalle.appendChild(p_1)
    div_detalle.appendChild(p_2)
 
    
    const div_iframe = document.createElement("div");
    div_iframe.classList.add("sucursales_iframe");
    const iframe1 = document.createElement("iframe");
    iframe1.src = iframe;

  div_iframe.innerHTML += `
        <iframe
            src="${iframe}"
            width="350" height="350" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>`;
 
    div_item.appendChild(div_detalle);
    div_item.appendChild(div_iframe);
 
    section.appendChild(span);
    section.appendChild(div_item);

    return section;

}
*/





/* SUCURSALES sin API */
/*
let spanSuc = document.querySelectorAll(".span_sucursales");

spanSuc.forEach((span) =>{
span.addEventListener("click",(e) =>{
     let span_e = e.target;
console.log(span_e)
span_e.classList.toggle("active");
})
})*/