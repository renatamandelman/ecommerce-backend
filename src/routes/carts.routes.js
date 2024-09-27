import { Router } from "express";
import { CartManager } from "../manager/cartmanager.js"
import { ProductManager } from "../manager/productManager.js";

const productsManager = new ProductManager();
const router = Router();

const cartsManager = new CartManager();

router.get("/", async (req, res) => {
    const carts = await cartsManager.getCarts();
    res.status(200).json({ status: "ok", payload: carts });
  });

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const product = await cartsManager.getCartById(Number(cid));
    
    if (!product)
      return res.status(404).json({ status: "error", message: "Product not found" });
  
    res.status(200).json({ status: "ok", payload: product });
  });

router.post("/", async (req,res) => { 
    const body = req.body;
    const cart = await cartsManager.createCart(body);
    res.status(200).json({status:"ok", payload:"carrito agregado" });
});

router.post("/:cid/product/:pid", async (req,res) => { 
    const { cid, pid } = req.params;
    // const body = req.body;
    const product =  await productsManager.getProductById(Number(pid));
    if(!product)  return res.status(404).json({ status: "error", message: "Product not found" });
     console.log(product)
    await cartsManager.addProductToCart(Number(cid),Number(pid));
    res.status(200).json({status:"ok", payload:`producto agregado al carrito ${pid}`});

 })

 export default router;