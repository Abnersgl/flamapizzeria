const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const resumenElement = document.getElementById("resumen");
const reiniciarCarritoElement = document.getElementById("reiniciar");

//Obtenemos el contenedor donde se colocaran las tarjetas
const conteinerTarjetas = document.getElementById("container-products");
//Funcion para crear las tarjetas de los productos
function crearTarjetas() {
    conteinerTarjetas.innerHTML = "";
    const productos = JSON.parse(localStorage.getItem("productos"));
    console.log(productos);
    if(productos && productos.length > 0){
        productos.forEach(producto => {
            const newProducto = document.createElement("div");
            newProducto.classList = "tarjeta-producto";
            newProducto.innerHTML = `
                <div class="product">
                    <img src="${producto.img}" alt="${producto.titulo}" class="image"> 
                    <span class="titulo">${producto.titulo}</span>
                    <span class="price">S/${producto.price}</span>
                    <div class="botones">
                        <button class='btn-js'>-</button>
                        <span class="cantidad">${producto.cantidad}</span>
                        <button class='btn-js'>+</button>
                    </div>
                </div>
            `;
            conteinerTarjetas.appendChild(newProducto);
            newProducto.getElementsByTagName("button")[1].addEventListener("click", (e) => {
                const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElement.innerText = agregarCarrito(producto);
                actualizarResumen();
            });
            newProducto.getElementsByTagName("button")[0].addEventListener("click", (e) => {
                restarCarrito(producto);
                crearTarjetas();     
                actualizarResumen();
            });
        });
    }
}

crearTarjetas();
actualizarResumen();

function actualizarResumen() {
    const productos = JSON.parse(localStorage.getItem("productos"));
    let unidades = 0;
    let precio = 0;
    if (productos && productos.length > 0){
        productos.forEach(producto =>{
            unidades += producto.cantidad;
            precio += producto.price * producto.cantidad;
        })
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio;
    }
    mostrarMensajeVacio();
}

function mostrarMensajeVacio(){
    const productos = JSON.parse(localStorage.getItem("productos"));
    carritoVacioElement.classList.toggle("escondido", productos && productos.length > 0);
    resumenElement.classList.toggle("escondido", !(productos && productos.length > 0));
}

mostrarMensajeVacio();


reiniciarCarritoElement.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
    localStorage.removeItem("productos");
    actualizarResumen();
    crearTarjetas();
}