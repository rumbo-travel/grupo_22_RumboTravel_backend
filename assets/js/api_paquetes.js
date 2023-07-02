//PAQUETES
const url = 'http://127.0.0.1:5000/api/paquetes'  
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
const mostrar = (paquetes) => {
    resultados ="";
    let cont =1
     //validamos la cantidad de datos que trae de la BD
   // if(clientes.length >0)
   // {
       paquetes.forEach(paquete => {
            
            resultados += `<tr>
                                <td>${cont++}</td>
                                <td>${paquete[1]}</td>
                                <td>${paquete[2]}</td>
                                <td>${paquete[3]}</td>
                                <td>${paquete[4]}</td>
                              
                               
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
const inicioPaquetes =()=>{
    // let fecha = new Date()

    // console.log(convertirFecha(fecha))
    fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))
}

inicioPaquetes();