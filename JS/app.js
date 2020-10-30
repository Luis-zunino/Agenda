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
        telefono = document.querySelector("#telefono").value;
    if (nombre === "" || empresa === "" || telefono === "") {
        console.log("Los campos esta vacio")
    } else {
        console.log("tiene algo");
    }
    console.log(nombre);
}