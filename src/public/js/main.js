const socket = io();
console.log("Si funciona");

const guardarProduct = document.getElementById("guardarProduct");
const log = document.getElementById("cardContenedor");

guardarProduct.addEventListener("click", (event) => {
  event.preventDefault();
  const newProduct = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
  };
  socket.emit("newProduct", newProduct);
});




socket.on("products", (products) => {
 
    log.innerHTML = "";
    products.forEach((product) => {
      log.innerHTML += `
        <div class="product" id="product">
  <p>Title:${product.title}</p>
  <p>Description: ${product.description}</p>
  <p>Price: ${product.price}</p>
  <p>Thumbnail: ${product.thumbnail}</p>
  <p>Code: ${product.code}</p>
  <p>Stock:${product.stock}</p>
  <p>Status:${product.status}</p>
  <p>Category:${product.category}</p>
  <button id=${product.code}>Eliminar</button>
</div>`;
    });
    const productButtons = document.querySelectorAll(".product button");

    productButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const productId = button.id;
        console.log(`eliminar: ${productId}`);
        socket.emit("deleteProduct", productId);
        
      });
    });
});
