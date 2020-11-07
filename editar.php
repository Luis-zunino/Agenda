<?php
include "inc/funciones/funciones.php";
include "inc/layout/header.php";


//editar registro
$id = filter_var($_GET["id"], FILTER_VALIDATE_INT); //validar que es un id

if (!$id) { // si no se pudo convertir el id si no se pudo encontrar id
    die("No es válido");
}
$resultado = obtenerContacto($id);
$contacto = $resultado->fetch_assoc(); //para que nos traiga los resultados y se almacenen en este contacto
?>

<pre>
<?php //var_dump($contacto); 
?>
</pre>
<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar Contacto</h1>
    </div>
</div>

<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend class="cen">Edite el Contacto</legend>
        <?php include "inc/layout/formulario.php"; ?>

    </form>
</div>






<?php include "inc/layout/footer.php"; ?>