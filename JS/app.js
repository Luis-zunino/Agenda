const formularioContactos = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('#listado-contactos tbody');
 
eventListeners();
 
function eventListeners() {
    formularioContactos.addEventListener('submit', leerFormulario);
}
function leerFormulario(e) { //e es el evento
    e.preventDefault(); //Evita cambiar la url con la accion, recomend for java/ajax
    const nombre = document.querySelector('#nombre').value, //captura valor introducido en id
        telefono = document.querySelector('#telefono').value,   // en los inputs
        empresa = document.querySelector('#empresa').value,
        accion = document.querySelector('#accion').value;
    if(nombre === '' || empresa === '' || telefono ==='') {
        //dos parametros
        mostrarNotificacion('All fields must be field', 'error');
    } else {
 
        // Pasa la validacion, crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);
 
        //console.log(...infoContacto); Permite leer los datos enviados
        if(accion === 'crear'){
            // crearemos un nuevo contacto
            insertarBD(infoContacto);
        } else {
 
        }
    }
}
/* INSERTAR MEDIANTE AJAX */
function insertarBD(datos) {
    // llamado a ajax
 
    // crear el objeto
    const xhr = new XMLHttpRequest();
 
    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);
 
    // pasar los datos
    xhr.onload = function() {
        if(this.status === 200) {
            console.log(JSON.parse( xhr.responseText) );//JSON.parse permite acceder facil a sus datos
            // leemos la respuesta de PHP
            const respuesta = JSON.parse( xhr.responseText);
            //Insertar nuevo elemento en tabla
            const nuevoContacto = document.createElement('tr');
            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;
            //crear contenedores botones
            const contenedorAcciones = document.createElement('td');
            //Icono editar
            const iconoEditar = document.createElement('i');//crea un elemento i
            iconoEditar.classList.add('fas', 'fa-pen-square');//le agrega clases al icono creado
            //crear el enlace para editar
            const btnEditar = document.createElement('a');//crea un lemento a
            btnEditar.appendChild(iconoEditar);// le agrega como hijo al elemento i creado anteriormente (a padre / i hijo)
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;//le agrega el id insertar_datos que se encuentra en editar.php( la respuesta biene de modelo-contactos.php)
            btnEditar.classList.add('btn', 'btn-editar');//le agrega las clases
            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);// le agrega como hijo el elemento a que a su vez tiene como hijo el elemento i.
            //icono eliminar
            const iconoEliminar = document.createElement('i');//crea el icono no el boton de eliminar
            iconoEliminar.classList.add('fas', 'fa-trash-alt');//le agrega las clases
            //btn eliminar
            const btnEliminar = document.createElement("button");//crea el boton de eliminar
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');
            ///agregarlo al daddy
            contenedorAcciones.appendChild(btnEliminar);
            //agregar al tr
            nuevoContacto.appendChild(contenedorAcciones);
            //agregarlo con los contacts
            listadoContactos.appendChild(nuevoContacto);
        }
    };
    //enviar datos
    xhr.send(datos)
}
 
//Notficacion de pantalla
function mostrarNotificacion(mensaje, clase) {
    const notification = document.createElement('div'); //Crea un div donde se introduce el elemento
    notification.classList.add(clase, 'notificacion', 'sombra'); //anade clases sobre notificacion
    notification.textContent = mensaje; //texto del mensaje
    //Inserta el mensaje antes del form.
    formularioContactos.insertBefore(notification, document.querySelector('form legend'));
    // Ocultar y Mostrar notificacion
    setTimeout(() => {  //Actua al cabo de 0.1s
        notification.classList.add('visible'); //Anade clase sobre notificacion
        setTimeout(() => {  //quita la clase al cabo de 3s
            notification.classList.remove('visible');
            setTimeout(() => {
                notification.remove(); //espera medio segundo para que se vea la animacion
            }, 500)
        }, 3000)
    }, 100)
}