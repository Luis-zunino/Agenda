<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
        type="text" 
        placeholder="Nombre Contacto" 
        id="nombre"
        value=" <?php echo (isset($contacto["nombre"])) ? $contacto["nombre"] : ""; //comprobar que si esta
        //variable contacto exite entonces se editara el contacto, si no existe se estara 
        //creando uno, funciona como si fuera un if ?>"
        >
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input 
        type="text" 
        placeholder="Nombre Empresa" 
        id="empresa"
        value="<?php echo (isset($contacto["empresa"])) ? $contacto["empresa"] : ""; ?>"
        >
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input 
        type="tel" 
        placeholder="Teléfono de Contacto" 
        id="telefono"
        value=" <?php echo (isset($contacto["telefono"])) ? $contacto["telefono"] : ""; ?>"
        >
    </div>
</div>
<div class="campo enviar">
    <input type="hidden" id="accion" value="crear">
    <input type="submit" value="Añadir">
</div>