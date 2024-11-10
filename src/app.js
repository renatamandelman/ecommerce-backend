import express from "express";
import router from "./routes/index.js";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
const PUERTO = 8080;
import "./database.js";
import ProductModel from "./models/product.model.js";
const app = express();

//middlewares
app.use(express.json()); // leer archivos archivos json
app.use(express.urlencoded({extended: true})); 
//habilitar archivos estaticos
app.use(express.static("./src/public"));

//express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use((req,res, next) => {
    console.log("se ejecuta el middleware a nivel app");
    next();
})

app.use("/api", router);

const httpServer = app.listen(PUERTO, () => console.log(`Servidor escuchando en el puerto ${PUERTO}`));
//product manager
import { ProductManager } from "./manager/productManager.js";
const productManager = new ProductManager();
import { CartManager } from "./manager/cartmanager.js";
const cartManager = new CartManager();
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    //emito los productos a realtime
    socket.emit("products", await productManager.getProducts());
    socket.on("newProduct", async (product) => { 
    try{
        console.log("Product data:", product); // Add this logging statement
        await manager.addProduct(product);
        io.sockets.emit("products", await productManager.getProducts());
     
    }catch(error){
        console.log("Error al agregar el nuevo producto");
    }
    });
    socket.on("deleteProduct", async (id) =>{
        try{
            console.log(id)
            await productManager.deleteProduct(id);
            io.sockets.emit("products", await productManager.getProducts());
            
        }catch(error){
            console.log("Error al eliminar el nuevo producto");
        }
    });
    socket.on("addProductCart", async (pid) => { 
        try{
        const cart = await cartManager.createCart();
        await cartManager.addProductToCart(cart.id,pid);
        }catch(error){
            console.log("Error al agregar el producto al carrito");
        }
     })
    // socket.emit("cart", await cartManager.getCarts())
});


