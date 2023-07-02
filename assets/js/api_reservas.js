//PAQUETES
const url = 'http://127.0.0.1:5000/api/reservas'  
const contenedor = document.querySelector('tbody')
let resultados = ''


let fechaActual = new Date()


//btn crear abre el modal
/*btnCrear.addEventListener('click', ()=>{
    dni.value = ''
    nombre.value = ''
    apellido.value = ''
    edad.value = ''
    selectAct.value = cargarActividades(text)
    modalCliente.show()
    opcion = 'crear'   //pasa a ser crear para tener un control y ver si estoy creando nuevo o editando
}) */

                          
//funcion para mostrar los resultados
const mostrar = (reservas) => {
    resultados ="";
    let cont =1
     //validamos la cantidad de datos que trae de la BD
   // if(clientes.length >0)
   // {
       reservas.forEach(reserva => {
            
            resultados += `<tr>
                                <td>${cont++}</td>
                                <td>${reserva[5]}</td>
                                <td>${reserva[3]}</td>
                                <td>${reserva[1]}</td>
                                <td>${reserva[2]}</td>
                                <td>${parseDate(reserva[4])}</td>
                                <td>${parseDate(reserva[6])}</td>
                                <td>
                                <button class="btnEditar btn btn-primary me-1"></button>
                                <button class="btnBorrar btn btn-danger"></button>
                                </td>
                           </tr>
                        `    
                        /*<td><a class="btnCobrar btn btn-success me-1" href="./pages/cuota.html?id=${paquete[0]}&actividad=${cliente.actividad}"><i class="bi bi-currency-dollar"></i></a></td>
                                <td>
                                <td><a class="btnCobrar btn btn-success me-1" href="./pages/cuota.html?id=${paquete[0]}"><i class="bi bi-currency-dollar"></i></a></td>
                                <td>*/
        })
        contenedor.innerHTML = resultados
  //  }else{  //sino trajo datos da vacia la busqueda

  //      busquedaVacia()
 //   }  
}

//Procedimiento Mostrar
const inicioReservas =()=>{
    // let fecha = new Date()

    // console.log(convertirFecha(fecha))
    fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))
}

inicioReservas();

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