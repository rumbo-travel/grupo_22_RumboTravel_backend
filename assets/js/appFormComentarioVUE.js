const { createApp } = Vue;


//creo un customcomponent propio
const customComponentFormComentario ={
    //template componente html
  template: `<div class="grid-item">
  <h3>{{h3_comentario}}</h3>
  <div class="container">
      <form id="form_comentario" novalidate>
          <div class="form-group">
              <label for="nombreC">{{nombre}}</label>
              <input type="text" class="form-control inputC" id="nombreC" placeholder="Ingrese su nombre">
              <span id="errorNombre" class="error"></span>
          </div>
          <div class="form-group">
              <label for="emailC">{{email}}</label>
              <input type="email" class="form-control inputC" id="emailC"
                  placeholder="nombre@example.com">
              <span id="errorEmail" class="error"></span>
          </div>
          <div class="form-group">
              <label for="comentario">{{comentario}}</label>
              <textarea class="form-control inputC" id="comentario" placeholder="Comentario..."
                  rows="3"></textarea>
              <span id="errorComentario" class="error"></span>
          </div>
          <button id="submit" class="boton btn-lg m-auto btn-primary py-1 ">{{btnEnviar}}</button>
      </form>
  </div>
  </div>`,

       //definimos la data a pasar
 data(){
    return {
        h3_comentario: 'Comentario',
        nombre :'Nombre',
        email :'Email',
        comentario :'Deje aquí su comentario',
        btnEnviar :'Enviar',
    };
},

 };

//monto el customcomponent creado
//montamos en el vue 
const appFormComentario = Vue.createApp({
    components : {
        //definimos el componente creado x nos arriba
        //nombre de la etiqueta creada en HTML : nombre de la funcion q la define
        "custom-component-form-comentario":customComponentFormComentario
    }
}).mount("#appFormComentario")