<?php
ini_set('display_errors', 1); //no se que hace copie de una pregunta
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
?>
<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input type="text" placeholder="Nombre Contacto" id="nombre" value="<?php echo (isset($contacto["nombre"])) ? $contacto["nombre"] : ""; //comprobar que si esta
                                                                            //variable contacto exite entonces se editara el contacto, si no existe se estara 
                                                                            //creando uno, funciona como si fuera un if 
                                                                            ?>">
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input type="text" placeholder="Nombre Empresa" id="empresa" value="<?php echo (isset($contacto["empresa"])) ? $contacto["empresa"] : ""; ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input type="tel" placeholder="Teléfono de Contacto" id="telefono" value="<?php echo (isset($contacto["telefono"])) ? $contacto["telefono"] : ""; ?>">
    </div>
</div>
<div class="campo enviar">
    <?php

    //$textoBtn = (isset($contacto[`telefono`])) ? `Guardar` : `Añadir`;
    //$accion = (isset($contacto["telefono"])) ? "editar" : "crear";
    ?>
    <?php
    // echo var_dump($contacto);

    if(isset($contacto["telefono"])) {
        $textoBtn = "Guardar";
        $accion = "editar";
    } else {
        $textoBtn = "Añadir";
        $accion = "crear";
    }
    ?>

    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if (isset($contacto["id"])) { ?>
    <?php } ?>
    <input type="submit" value="<?php echo $textoBtn; ?>">
</div>