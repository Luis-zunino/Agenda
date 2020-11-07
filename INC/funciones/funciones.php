<?php
//funcion que va a mostrar los registros de la base de datos en la parte inferior ("2 contactos")
function obtenerContactos()
{
    //cuando mande a ejecutar la funcion o sea la mande llamar en los scripts va a incluir una coneccion para poder realizar una consulta
    include "bd.php";
    try {
        //va a realizar una consula a un query a lo que viene siendo la base de datos( con el mismo nombre que se creo la conexion en este caso conn)
        return $conn->query(" SELECT id, nombre,empresa, telefono FROM contactos" /*se coloca la instruccion a SQL*/);
    } catch (Exception $e) {
        //para que retorne un mensaje de error
        echo "Error!" . $e->getMessage() . "<br>";
        //retonra false cada vez que haya un error asi de este modo se puede colocar un if y cada vez que se ejecuta la funcion no haga nada
        return false;
    }
}
//OBTIENE UN CONTACTO TOMA UN  ID
function obtenerContacto($id)
{
    include "bd.php";
    try {
        return $conn->query(" SELECT id, nombre,empresa, telefono FROM contactos WHERE id = $id " /*se coloca la instruccion a SQL*/);
    } catch (Exception $e) {
        echo "Error!" . $e->getMessage() . "<br>";
        return false;
    }
}
