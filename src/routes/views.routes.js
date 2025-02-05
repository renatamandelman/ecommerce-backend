import { Router } from "express";
const router = Router();
import ProductModel from "../models/product.model.js";
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager();
import { CartManager } from "../manager/cartmanager.js";
const cartManager = new CartManager();

router.get("/products", async (req,res,next) =>{
try{
    const products = await ProductModel.find().lean();

    res.render("home", {products});
}catch (error) {
  next(error);
    console.log(`Error: ${error.message}`);
  }
});
router.get("/products/:pid", async(req, res,next) => {
  const { pid } = req.params;
  try{  
  const product = await productManager.getProductById(pid);
  res.render("singleProduct", { product });
} catch(error){
  next(error);
  console.log(`Error: ${error.message}`);
}
});

router.get("/realtimeproducts", async (req,res,next) => {
    try{
    const products = await ProductModel.find().lean();
    res.render("realTimeProducts", {products});
    }catch (error) {
      next(error);
        console.log(`Error: ${error.message}`);
      }

})
router.get('/carts/:cid', async (req, res,next) => {
  const { cid } = req.params;
  try{
  const cart = await cartManager.getCartById(cid);
  res.render('cart', { cart });
  }catch (error) {
    next(error);
    console.log(`Error: ${error.message}`);
    }
  });






export default router;