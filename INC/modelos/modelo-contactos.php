<?php
error_reporting(E_ALL ^ E_NOTICE);

if ($_POST["accion"] == "crear") {
    //creara un nuevo registro en la base de datos
    require_once("../funciones/bd.php");

    //validar las entradas
    $nombre = filter_var($_POST["nombre"], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST["empresa"], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST["telefono"], FILTER_SANITIZE_STRING);
    try {
        $stmt = $conn->prepare(" INSERT INTO contactos (nombre, empresa, telefono) VALUES (?,?,?) ");
        $stmt->bind_param("sss", $nombre, $empresa, $telefono);
        $stmt->execute();
        if ($stmt->affected_rows == 1) {
            $respuesta = array(
                "respuesta" => "correcto",
                "datos" => array(
                    "nombre" => $nombre,
                    "empresa" => $empresa,
                    "telefono" => $telefono,
                    "id_insertado" => $stmt->insert_id
                )
            );
        }

        $stmt->close();
        $conn->close();
    } catch (\Exception $e) {
        $respuesta = array(
            "error" => $e->getMessage()
        );
    }
    echo json_encode($respuesta);
}
if ($_GET["accion"] == "borrar") {
    //abrimos la conexion
    require_once("../funciones/bd.php");
    //validamos el id
    $id = filter_var($_GET["id"], FILTER_SANITIZE_NUMBER_INT);
    try {
        $stmt = $conn->prepare(" DELETE FROM contactos WHERE id = ? ");
        $stmt->bind_param("i", $id);
        //ejecuta la consulta a la base de datos
        $stmt->execute();
        if ($stmt->affected_rows == 1) {
            $respuesta = array(
                "respuesta" => "correcto"
            );
        }
        //cierra el stmt
        $stmt->close();
        $conn->close();
    } catch (\Exception $e) {
        $respuesta = array(
            "error" => $e->getMessage()
        );
    }
    echo json_encode($respuesta);
    echo json_encode($_GET);
}
