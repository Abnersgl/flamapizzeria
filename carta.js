
//Funcion para la barra de busqueda
function search() {
    //dentro de filter guardamos el elemento contrado en find
    var filter = document.getElementById('find').value.toUpperCase();
    //dentro de item guardamos todos los productos
    var item = document.querySelectorAll('.product');
    //dentro de l guadamos el nombre del producto 
    var l = document.getElementsByClassName("titulo");

    //for para colocar los elementos que coincidan con lo ingresado
    for (var i = 0; i <= l.length - 1; i++) {
        var a = item[i].getElementsByClassName("titulo")[0];
        var value = a.innerHTML || a.innerText || a.textContent;

        if (value.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

//Obtenemos el contenedor donde se colocaran los productos
const conteinerTarjetas = document.getElementById("container-products");

//Funcion para crear las tarjetas de los productos
function crearTarjetas(productos) {
    productos.forEach(producto => {
        const newProducto = document.createElement("div");
        newProducto.classList = "tarjeta-producto";
        newProducto.innerHTML = `
            <div class="product">
                <img src="${producto.img}" alt="${producto.titulo}" class="image"> 
                <span class="titulo">${producto.titulo}</span><br>
                <span class="description">${producto.description}</span><br>
                <span class="price">S/${producto.price}</span>
                <button class="btn">Agregar</button>
            </div>
        `;
        conteinerTarjetas.appendChild(newProducto);
        newProducto.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarCarrito(producto));
    });
}
crearTarjetas(productos);