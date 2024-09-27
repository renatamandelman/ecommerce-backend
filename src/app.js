import express from "express";
import router from "./routes/index.js";

const app = express();
app.use(express.json()); // leer archivos archivos json
app.use(express.urlencoded({extended: true})); 

//habilitar archivos estaticos
app.use("/static", express.static("public"));

app.use((req,res, next) => {
    console.log("se ejecuta el middleware a nivel app");
    next();
})

app.use("/api", router);


app.listen(8080, () => {
    console.log("Server on port 8080");
})
