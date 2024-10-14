const socket = io();
console.log("Si funciona");

const guardarProduct = document.getElementById("guardarProduct");

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
  console.log(newProduct);

  const log = document.getElementById("product");

  log.innerHTML = `
      
    <p>Title:${newProduct.title}</p>
    <p>Description: ${newProduct.description}</p>
    <p>Price:${newProduct.price}</p>
    <p>Thumbnail: {${newProduct.thumbnail}</p>
    <p>Code: ${newProduct.code}</p>
    <p>Stock:${newProduct.stock}</p>
    <p>Status:${newProduct.status}</p>
    <p>Category:${newProduct.category}</p>
`;
});

const productButtons = document.querySelectorAll(".product button");

productButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const productId = button.id;
    console.log(`eliminar: ${productId}`)
    socket.emit("deleteProduct", productId);
  });
});

//realTimeProducts


