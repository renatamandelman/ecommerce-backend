import { Router } from "express";
import { ProductManager } from "../manager/productManager";
const router = Router();
const manager = new ProductManager("./src/manager/data/products.json");


router.get("/products", async (req,res) =>{
//try y catch
    const products = await manager.getProducts();

res.render("home", {products});
});

router.get("/realtimeproducts", async (req,res) => {
    res.render("realtimeproducts");
})

export default router;