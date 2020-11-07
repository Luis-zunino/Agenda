const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    //cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener('submit', leerFormulario);
    // listener para eliminar el boton
    if (listadoContactos) {
        listadoContactos.addEventListener("click", eliminarContacto);
    }
}


function leerFormulario(e) { //e es el evento
    e.preventDefault(); //Evita cambiar la url con la accion, recomend for java/ajax
    const nombre = document.querySelector('#nombre').value, //captura valor introducido en id
        telefono = document.querySelector('#telefono').value, // en los inputs
        empresa = document.querySelector('#empresa').value,
        accion = document.querySelector('#accion').value;
    if (nombre === '' || empresa === '' || telefono === '') {
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
        if (accion === 'crear') {
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
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText)); //JSON.parse permite acceder facil a sus datos
            // leemos la respuesta de PHP
            const respuesta = JSON.parse(xhr.responseText);
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
            const iconoEditar = document.createElement('i'); //crea un icono editar ( i )
            iconoEditar.classList.add('fas', 'fa-pen-square'); //le agrega clases al icono creado
            //crear el enlace para editar
            const btnEditar = document.createElement('a'); //crea un lemento a
            btnEditar.appendChild(iconoEditar); // le agrega como hijo al elemento i creado anteriormente (a padre / i hijo)
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`; //le agrega el id insertar_datos que se encuentra en editar.php( la respuesta biene de modelo-contactos.php)
            btnEditar.classList.add('btn', 'btn-editar'); //le agrega las clases
            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar); // le agrega como hijo el elemento a que a su vez tiene como hijo el elemento i.
            //icono eliminar
            const iconoEliminar = document.createElement('i'); //crea el icono no el boton de eliminar
            iconoEliminar.classList.add('fas', 'fa-trash-alt'); //le agrega las clases
            //btn eliminar
            const btnEliminar = document.createElement("button"); //crea el boton de eliminar
            btnEliminar.appendChild(iconoEliminar); //le agrega como hijo el icono i creado anteriormente (iconoEliminar)
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado); // cada boton eliminar tiene un data-id por eso le agrega ese atributo para luego poder eliminarlo de la base de datos el cual viene de respuesta.datos.id_insertado
            btnEliminar.classList.add('btn', 'btn-borrar'); //le agrega las clases
            ///agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);
            //agregar al tr
            nuevoContacto.appendChild(contenedorAcciones);
            //agregarlo con los contactos
            listadoContactos.appendChild(nuevoContacto);
            //resetear el formulario
            document.querySelector("form").reset();
            //mostrar la notificacion
            mostrarNotificacion("Contacto Creado Correctamente", "correcto")
        }
    };
    //enviar datos
    xhr.send(datos)
}
//eliminar el contacto
function eliminarContacto(e) {
    //console.log("has hecho click"); nos avisa que hemos hecho click
    //console.log(e.target);dice que tipo de elemento discte click
    if (e.target.parentElement.classList.contains("btn-borrar")) {
        /*con parentElement nos da el padre del elemento,
        en vez de seleccionarnos el i que es el hijo nos selecciona el boton completo 
        y con classlist.contains buscamos elementos con la clase que le pusimos*/

        //tomar el id del elemento clickeado
        const id = e.target.parentElement.getAttribute("data-id");
        //console.log(id);
        // preguntar al usuario si esta seguro
        const respuesta = confirm("¿Estás seguro(a)?");
        if (respuesta) {
            //llamado a ajax
            //crear el objeto
            const xhr = new XMLHttpRequest();
            //abrir la conexion, con get extrae un dato ya existente de la base de datos
            xhr.open("GET", `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true)
            //leer la repsuesta


            xhr.onload = function () {
                if (this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);
                    console.log(resultado);

                    if (resultado.respuesta === "correcto") {
                        //eliminar el registro del dom
                        console.log(e.target.parentElement.parentElement.parentElement); //me indica que elemento estoy seleccionando,escribo mas de una vez parentElement segun sea necesario ir al padre del padre
                        e.target.parentElement.parentElement.parentElement.remove();
                        //mostrar notificacion
                        mostrarNotificacion("Contacto Eliminado", "correcto");

                    } else {
                        //mostramos una notificacion
                        mostrarNotificacion("Hubo un error...", "error");
                    }
                }
            }
            //enviar la peticion
            xhr.send();
        }
    }
}
//Notficacion de pantalla
function mostrarNotificacion(mensaje, clase) {
    const notification = document.createElement('div'); //Crea un div donde se introduce el elemento
    notification.classList.add(clase, 'notificacion', 'sombra'); //anade clases sobre notificacion
    notification.textContent = mensaje; //texto del mensaje
    //Inserta el mensaje antes del form.
    formularioContactos.insertBefore(notification, document.querySelector('form legend'));
    // Ocultar y Mostrar notificacion
    setTimeout(() => { //Actua al cabo de 0.1s
        notification.classList.add('visible'); //Anade clase sobre notificacion
        setTimeout(() => { //quita la clase al cabo de 3s
            notification.classList.remove('visible');
            setTimeout(() => {
                notification.remove(); //espera medio segundo para que se vea la animacion
            }, 500)
        }, 3000)
    }, 100)
}