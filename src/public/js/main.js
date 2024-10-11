const socket = io();
console.log("Si funciona");
//realTimeProducts
socket.on("products", data => {
    renderProducts(data);
});
const guardarProduct = document.getElementById("guardarProduct");
 
guardarProduct.addEventListener("click", (event) => { 
    event.preventDefault();
    const newProduct = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        thumbnail:document.getElementById("thumbnail").value,
        code:document.getElementById("code").value,
        stock:document.getElementById("stock").value,
        status:document.getElementById("status").value,
        category:document.getElementById("category").value
      };
      if(newProduct.title.length === 0 || newProduct.description.length === 0 || newProduct.price.length === 0){
        alert("debe completar los campos");
      } else{
        socket.emit("newProduct", newProduct);
        console.log(newProduct)
      }
    
  });

//realTimeProducts


//renderizar en pnatalla los productos
//sumar un boton para eliminar productos
//sumar un form para crear neuevos productos
//todo esto tiene que actualizar en tiempo real