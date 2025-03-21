import "./utils/env.util.js";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import expressSession from "express-session"; 
// import sessionFileStore from "session-file-store";
import MongoStore from "connect-mongo";
import router from "./routes/index.js";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import dbConnect from "./utils/dbConnect.util.js";
import ProductModel from "./manager/dao/mongo/models/product.model.js";
import argsUtil from "./utils/args.util.js";
const app = express();
const port = argsUtil.p;
const ready = async () => {
  console.log("server is ready on port " + port);
  await dbConnect();
  console.log("mongo connected");
};
// app.listen(port, ready);

//middlewares
app.use(express.json()); // leer archivos archivos json
app.use(express.urlencoded({extended: true})); 
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser(process.env.COOKIE_KEY));
//habilitar archivos estaticos
// app.use(express.static("./src/public"));
app.use(express.static("public"));

//express-handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use((req,res, next) => {
    console.log("se ejecuta el middleware a nivel app");
    next();
})

app.use(
    session({
      secret: process.env.SESSION_KEY,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 60 * 24 * 7 * 1000 },
      /*     store: new FileStore({
        path: "./src/data/sessions",
        ttl: 60 * 60 * 24 * 7,
      }), */
      store: new MongoStore({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 60 * 60 * 24 * 7,
      }),
    })
  );

app.use(session({ 
    secret: process.env.COOKIE_KEY, 
    resave: true, 
    saveUninitialized: true, 
    cookie: {maxAge:10000},
    }));

app.use("/api", router);
app.use(errorHandler);
app.use(pathHandler);

const httpServer = app.listen(port, ready);
//product manager
import { ProductManager } from "./manager/productManager.js";
const productManager = new ProductManager();
import { CartManager } from "./manager/cartmanager.js";
import errorHandler from "./middlewares/errorHandler.mid.js";
import pathHandler from "./middlewares/pathHandler.mid.js";
const cartManager = new CartManager();
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    //emito los productos a realtime
    socket.emit("products", await productManager.getProducts());
    socket.on("newProduct", async (product) => { 
    try{
        console.log("Product data:", product); // Add this logging statement
        await productManager.addProduct(product);
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


