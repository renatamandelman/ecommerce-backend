const socket = io();
console.log("Si funciona");
//realTimeProducts
socket.on("products", data => {
    renderProducts(data);
})


