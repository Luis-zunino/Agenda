const formularioContactos = document.querySelector("#contacto");


eventListeners();

function eventListeners() {
    //cuando el formulario de crear o editar se ejecuta
    formularioContactos.addEventListener("submit", leerFormulario);
}

function leerFormulario(e) {
    e.preventDefault();
    //leero los datos de los imputs
    const nombre = document.querySelector("#nombre").value,
        empresa = document.querySelector("#empresa").value,
        telefono = document.querySelector("#telefono").value,
        accion = document.querySelector("#accion").value;

    if (nombre === "" || empresa === "" || telefono === "") {
        //DOS PARAMETROS TEXTO Y CLASE
        mostrarNotificacion("Todos los campos son obligatorios", "error");
    } else {
        //PASA LA VALIDACION, CREAR LLAMADO A AJAX
        const infoContacto = new FormData();
        infoContacto.append("nombre", nombre);
        infoContacto.append("empresa", empresa);
        infoContacto.append("telefono", telefono);
        infoContacto.append("accion", accion);

        //console.log(...infoContacto);
        if (accion === "crear") {
            //creamos un nuevo contacto
            insertarBD(infoContacto);
        } else {
            //editar el contacto
        }

    }
    console.log(nombre);
}
/**INSERTA EN LA BASE DE DATOS VIA AJAX **/
function insertarBD(datos){
//llamado a ajax

//crear el objeto
const xhr = new XMLHttpRequest();
//abrir conexion
xhr.open("POST", "inc/modelos/modelo-contactos.php", true);
//pasar los datos
xhr.onload = function(){
    if(this.status === 200){
        console.log(JSON.parse(xhr.responseText));
    }
}
//enviar los datos
xhr.send(datos)
}
//NOTIFICACIONES EN PANTALLA
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement("div");
    notificacion.classList.add(clase, "notificacion", "sombra");
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector("form legend"));
    //ocultar y mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add("visible");
        setTimeout(() => {
            notificacion.classList.remove("visible");
            setTimeout(() => {
                notificacion.remove();
            }, 500)
        }, 3000)
    }, 100)
}