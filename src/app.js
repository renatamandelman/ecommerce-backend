import express from "express";
import router from "./routes/index.js";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
const PUERTO = 8080;
const app = express();

//middlewares
app.use(express.json()); // leer archivos archivos json
app.use(express.urlencoded({extended: true})); 
//habilitar archivos estaticos
app.use("/static", express.static("./public"));

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
const manager = new ProductManager("./src/manager/data/products.json");
const io = new Server(httpServer);
io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    //emito los productos a realtime
    socket.emit("products", await manager.getProducts())
});