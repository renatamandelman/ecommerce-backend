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
  try{
    const { cid, pid } = req.params;
    await cartsManager.addProductToCart(cid,pid);
    res.status(200).json({status:"ok", payload:`producto agregado al carrito ${pid}`});
  }catch(error){
    res.status(404).json({status:"error", payload:`No se agrego producto a carrito. ${error.message}`});
  }
 });
 router.put("/:cid", async (req,res) => {
    const {cid} = req.params;
    const {products} = req.body;
    try{
      const cart = await cartsManager.updateCart(cid,products);
      res.status(200).json({status:"ok", payload:cart});
    }catch(error){
      res.status(404).json({status:"error", payload:`No se actualizo carrito: ${error.message}`});
    }
 })
 router.put("/:cid/product/:pid", async (req,res) => {   
  const { cid, pid } = req.params;
  const {quantity} = req.body;
  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(400).json({ error: 'Invalid quantity. It must be a non-negative number.' });
  }
  try{
    const cart = await cartsManager.updateProductQuantity(cid,pid,quantity);
  res.status(200).json({status:"ok", payload:cart});
  }catch(error){
    res.status(400).json({ status: "error", message: error.message });
  }
  });
  router.delete("/:cid/products/:pid", async (req,res) => {
    const { cid, pid } = req.params;
    try{
      const cart = await cartsManager.deleteProduct(cid,pid);
      res.status(200).json({status:"ok", payload:cart});
      }catch(error){
        res.status(404).json({status:"error", payload:`No se elimino producto del
          carrito: ${error.message}`});
        }
    });
    router.delete("/:cid", async(req,res) =>{
      const {cid} = req.params;
      try{
        await cartsManager.deleteCart(cid);
        res.status(200).json({status:"ok", payload:`carrito eliminado ${cid}`});
      }catch(error){
        res.status(404).json({status:"error", payload:`No se elimino carrito ${cid}`});
      }
    })


 export default router;