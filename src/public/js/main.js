const socket = io();
console.log("Si funciona");

const guardarProduct = document.getElementById("guardarProduct");
// let log = document.getElementById("cardContenedor");

// guardarProduct.addEventListener("click", (event) => {
//   event.preventDefault();
//   const newProduct = {
//     title: document.getElementById("title").value,
//     description: document.getElementById("description").value,
//     price: document.getElementById("price").value,
//     thumbnail: document.getElementById("thumbnail").value,
//     code: document.getElementById("code").value,
//     stock: document.getElementById("stock").value,
//     category: document.getElementById("category").value,
//     status:document.getElementById("status").value === "true",
//   }
//   socket.emit("newProduct", newProduct);
  
// });



// socket.on("products", (products) => {
//   log.innerHTML = "";
//   products.forEach((product) => {
//     log.innerHTML += `
//       <div class="product" id="product">
//       <p>Title:${product.title}</p>
//       <p>Description: ${product.description}</p>
//       <p>Price: ${product.price}</p>
//       <button id=${product.code}>Eliminar</button>
//     </div>
//     `
//   });
//   const productButtons = document.querySelectorAll(".product button");

//   productButtons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       event.preventDefault();
//       const productId = button.id;
//       console.log(`eliminar: ${productId}`);
//       socket.emit("deleteProduct", productId);
//     });
//   });
// });


socket.on("products",(data) => {
  renderProductos(data)
} );

const renderProductos = (productos) => {
  const cardContenedor = document.getElementById("cardContenedor");
  cardContenedor.innerHTML = "";
  productos.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("product");
    card.innerHTML = `
    <p>Title:${item.title}</p>
    <p>Description: ${item.description}</p>
    <p>Price: ${item.price}</p>
    <button data-id=${item._id}>Eliminar</button>
    `
    cardContenedor.appendChild(card);

    // card.querySelector("button").addEventListener("click", () => {
    //   e.preventDefault();
    //   const productId = item.dataset.id;
    //   console.log("delete: " + productId);
    //   socket.emit("deleteProduct", productId);
    //   // console.log("eliminar")
    //   // eliminarProduct(item.id);
      
    // })
    const productButtons = document.querySelectorAll(".product button");

  productButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.dataset.id;
      socket.emit("deleteProduct", productId);
    });
    });
  })
}


// const eliminarProduct = (id) => {
//   socket.emit("deleteProduct", id);
//   const productId = button.dataset.id;
//   console.log("delete: " + productId);
//   socket.emit("deleteProduct", productId);
// }
guardarProduct.addEventListener("click", (event )=>{
  event.preventDefault();
  agregarProduct();
})


const agregarProduct = () =>{
  const newProduct = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status:document.getElementById("status").value === "true",
  }
  socket.emit("newProduct", newProduct);
  
}

  const buttonAddCart = document.getElementById("addProductCart");
  // if (!buttonAddCart) {
  //   console.log("No se encontró el botón");
  // } else {
    buttonAddCart.addEventListener("click", (event) => {
      event.preventDefault();
      
      // Verificar si el id del producto se obtiene correctamente
      const pid = buttonAddCart.getAttribute("data-id");
      console.log("Producto ID:", pid);  // Esto debería mostrar el ID si está bien
      socket.emit("addProductCart", pid); // Emite el evento con el pid
    });
  
  // const buttons = document.querySelectorAll("#addProductCart");

  // // Añadir el listener de evento a cada botón
  // buttons.forEach(button => {
  //   button.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     // Obtener el valor de data-id
  //     const pid = event.target.getAttribute("data-id");
  //     console.log("Producto ID:", pid);  // Deberías ver el ID del producto en la consola

  //     // Emitir el evento con el PID
  //     socket.emit("addProductCart", pid);
  //   });
  // });



  // socket.on("cart",(data) => {
  //   renderCart(data)
  // } );
  
  // const renderCart = (cart) => {
  //   const cartContenedor = document.getElementById("cart");
  //   cartContenedor.innerHTML = "";
  //   cartContenedor.innerHTML = `
  //     <h1>Cart ${cart._id}</h1>
  //     <p> ${cart.products}</p>
  //     `
  //   }

      