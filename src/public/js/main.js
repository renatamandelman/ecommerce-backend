const socket = io();
console.log("Si funciona");
//realTimeProducts
socket.on("products", data => {
    renderProducts(data);
});
const guardarProduct = document.getElementById("guardarProduct");
 
guardarProduct.addEventListener("click", (event) => { 
    const newProduct = {
        name: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value
      };
      if(newProduct.name.length === 0 || newProduct.description.length === 0 || newProduct.price.length === 0){
        alert("debe completar los campos");
      } else{
        io.emit("newProduct", {newProduct})
      }
    
  })
//realTimeProducts


//renderizar en pnatalla los productos
//sumar un boton para eliminar productos
//sumar un form para crear neuevos productos
//todo esto tiene que actualizar en tiempo real