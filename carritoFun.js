
function agregarCarrito(product){
    const memoria = JSON.parse(localStorage.getItem("productos"));
    let cuenta = 0;
    if (!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(product);
        localStorage.setItem("productos", JSON.stringify([nuevoProducto]));
        cuenta = 1;
    } else {
        const indProducto = memoria.findIndex(producto => producto.id === product.id);
        const nuevaMemoria = memoria;
        //Si indProducto es -1 signfica que no lo ha encontrado en el localStorage
        if (indProducto === -1){
            //si no lo encuentra lo agrega al localStorage
            nuevaMemoria.push(getNuevoProductoParaMemoria(product));
            localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
            cuenta = 1;
        } else {
            //si ya existe, incremente la cantidad el producto en 1
            nuevaMemoria[indProducto].cantidad ++;
            cuenta = nuevaMemoria[indProducto].cantidad;
        }
        localStorage.setItem("productos", JSON.stringify(nuevaMemoria));
    }
    actualizarNumeroCarrito();
    return cuenta;
}

function restarCarrito(product){
    const memoria = JSON.parse(localStorage.getItem("productos"));
    const indProducto = memoria.findIndex(producto => producto.id === product.id);
    if(memoria[indProducto].cantidad === 1){
        memoria.splice(indProducto, 1);
    } else {
        memoria[indProducto].cantidad --;
    }
    localStorage.setItem("productos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
}

//Obtiene un producto devolviendolo con cantidad 1
function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = producto;
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

const cuentaCarritoElement = document.getElementById("count");
//Contabilizar la cantidad de productos en memoria
function actualizarNumeroCarrito(){
    const memoria = JSON.parse(localStorage.getItem("productos"));
    if (memoria && memoria.length > 0){
        const cuenta = memoria.reduce((acum, current) => acum+current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
    } else {
        cuentaCarritoElement.innerText = 0;
    }
    
}

actualizarNumeroCarrito();


async function generarPDFCarrito() {
    const { jsPDF } = window.jspdf;
    const memoria = JSON.parse(localStorage.getItem("productos"));

    if (!memoria || memoria.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const doc = new jsPDF();

    // Título
    doc.setFontSize(20);
    doc.text("LISTA DE DESEADOS", 105, 10, null, null, 'center');

    // Configuración de la tabla
    doc.setFontSize(12);
    let y = 20;
    const cellPadding = 3;
    const colWidths = [30, 100, 40]; // Anchos de las columnas: Cantidad, Título, Precio
    const startX = 10;
    const rowHeight = 10;
    const margin = 5; // Margen entre el borde de la celda y el texto

    // Dibujar encabezados
    doc.setFontSize(12);
    doc.text("Cantidad", startX + colWidths[0] / 2, y, null, null, 'center');
    doc.text("Título", startX + colWidths[0] + colWidths[1] / 2, y, null, null, 'center');
    doc.text("Precio", startX + colWidths[0] + colWidths[1] + colWidths[2] / 2, y, null, null, 'center');
    y += rowHeight;

    // Dibujar productos
    memoria.forEach((producto, index) => {
        const cantidad = producto.cantidad.toString();
        const titulo = producto.titulo ? producto.titulo.toString() : "Sin título";
        const precio = "S/." + (producto.price ? producto.price.toFixed(2) : "0.00");

        // Dibujar cada celda con margen
        const rowY = y + (index * rowHeight); // Calcular posición vertical de la fila
        doc.text(cantidad, startX + colWidths[0] / 2, rowY + margin, null, null, 'center');
        doc.text(titulo, startX + colWidths[0] + colWidths[1] / 2, rowY + margin, null, null, 'center');
        doc.text(precio, startX + colWidths[0] + colWidths[1] + colWidths[2] / 2, rowY + margin, null, null, 'center');
    });

    // Dibujar bordes de la tabla
    memoria.forEach((_, i) => {
        const rowY = y + (i * rowHeight);
        doc.rect(startX, rowY, colWidths.reduce((a, b) => a + b, 0), rowHeight); // Borde de la fila
    });

    // Añadir total a pagar
    const totalPagar = precioElement.innerText;
    const totalPagarY = y + (memoria.length * rowHeight) + 10; // Calcular posición vertical del total a pagar
    doc.setFontSize(16);
    doc.text(`Total a pagar: S/. ${totalPagar}`, startX, totalPagarY);

    // Guardar el PDF
    doc.save("orden.pdf");
}

