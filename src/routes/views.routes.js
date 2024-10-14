import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";
const router = Router();
const manager = new ProductManager("./src/manager/data/products.json");
// import { io } from "../app.js"; // Importa io desde app.js


router.get("/products", async (req,res) =>{
try{
    const products = await manager.getProducts();

    res.render("home", {products});
}catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

router.get("/realtimeproducts", async (req,res) => {
    try{
    const products = await manager.getProducts();
    res.render("realTimeProducts", {products});
    }catch (error) {
        console.log(`Error: ${error.message}`);
      }

})






export default router;