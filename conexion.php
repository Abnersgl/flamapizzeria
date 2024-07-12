    <?php
    //conexión a bd
    $conexion = mysqli_connect("localhost", "root", "", "reservas");

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $celular = $_POST['celular'];
        $personas = $_POST['personas'];
        $fecha = $_POST['fecha'];
        $hora = $_POST['hora'];

        //ingresar valores a la bd
        $sql = "INSERT INTO datos (nombre, correo, celular, personas, fecha, hora) 
        VALUES ('$nombre','$correo','$celular','$personas','$fecha','$hora')";
        
        // Ejecutar la consulta
        if (mysqli_query($conexion, $sql)) {
        echo "<script>alert('Reserva realizada satisfactoriamente');
        window.history.back();</script>";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conexion);
    }
}

    // Cerrar la conexión a la base de datos
    mysqli_close($conexion);
    ?>




