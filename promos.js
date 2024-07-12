//Obtenemos el contenedor donde se colocaran los productos
const conteinerPasta = document.getElementById("pasta");
const conteinerVinos = document.getElementById("vinos");
const conteinerPizza = document.getElementById("pizza");
const conteinerBebida = document.getElementById("bebida");


//Funcion para crear las tarjetas de los productos

function crearTarjetas(promosItems) {
    promosItems.forEach(producto => {
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
        let contenedor;
        switch (producto.cat) {
            case 'pasta':
                contenedor = conteinerPasta;
                break;
            case 'vinos':
                contenedor = conteinerVinos;
                break;
            case 'pizza':
                contenedor = conteinerPizza;
                break;
            case 'bebida':
                contenedor = conteinerBebida;
                break;
        }
        contenedor.appendChild(newProducto); 

        newProducto.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarCarrito(producto));
    });
}
crearTarjetas(promosItems);