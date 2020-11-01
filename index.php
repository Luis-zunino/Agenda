<?php include "inc/layout/header.php";
include "inc/funciones/funciones.php";
?>



<div class="contenedor-barra">
    <h1>Agenda de Contactos</h1>
</div>
<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend class="cen">Añada un Contacto <span>Todos los campos son obligatorios</span></legend>

        <?php include "inc/layout/formulario.php"; ?>



    </form>
</div>

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contactos...">
        <p class="total-contactos"><span>2</span>Contactos</p>
        <div class="contenedor-tabla">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>

                    </tr>
                </thead>
                <tbody>
                    <?php $contactos = obtenerContactos()/*cuando se mande llamar esta funcion, va a ir a funciones.php y solicitar datos*/;
                    if ($contactos->num_rows) { /*una forma de revisar si hay registros*/
                        foreach ($contactos as $contacto) {  ?>

                            <tr>
                            <pre> <?php var_dump($contacto); ?> </pre>
                                <td><?php echo $contacto["nombre"]; ?></td>
                                <td><?php echo $contacto["empresa"]; ?></td>
                                <td><?php echo $contacto["telefono"]; ?></td>
                                <td>
                                    <a class="btn-editar btn" href="editar.php?id=<?php echo $contacto["id"]; ?>">
                                        <i class="fas fa-pen-square"></i>
                                    </a>
                                    <button data-id="<?php echo $contacto["id"]; ?>" type="button" class="btn-borrar btn">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                    <?php }
                    } ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include "inc/layout/footer.php"; ?>