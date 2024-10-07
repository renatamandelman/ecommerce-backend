const socket = io();
console.log("Si funciona");
//realTimeProducts
socket.on("products", data => {
    renderProducts(data);
})
//renderizar en pnatalla los productos
//sumar un boton para eliminar productos
//sumar un form para crear neuevos productos
//todo esto tiene que actualizar en tiempo real

