import { Router } from "express";
const viewsRouter = Router();
import ProductModel from "../manager/dao/mongo/models/product.model.js";
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager();
import { CartManager } from "../manager/cartmanager.js";
import { productsManager, usersManager } from "../manager/dao/dao.js";
import { cartsManager } from "../manager/dao/memory/manager.memory.js";
const cartManager = new CartManager();

// router.get("/products", async (req,res,next) =>{
// try{
//     const products = await ProductModel.find().lean();

//     res.render("index", { products, title: "HOME" });
// }catch (error) {
//   next(error);
//     console.log(`Error: ${error.message}`);
//   }
// });
// router.get("/products/:pid", async(req, res,next) => {
//   const { pid } = req.params;
//   try{  
//   const product = await productManager.getProductById(pid);
//   res.render("singleProduct", { product });
// } catch(error){
//   next(error);
//   console.log(`Error: ${error.message}`);
// }
// });

// router.get("/realtimeproducts", async (req,res,next) => {
//     try{
//     const products = await ProductModel.find().lean();
//     res.render("realTimeProducts", {products});
//     }catch (error) {
//       next(error);
//         console.log(`Error: ${error.message}`);
//       }

// })
// router.get('/carts/:cid', async (req, res,next) => {
//   const { cid } = req.params;
//   try{
//   const cart = await cartManager.getCartById(cid);
//   res.render('cart', { cart });
//   }catch (error) {
//     next(error);
//     console.log(`Error: ${error.message}`);
//     }
//   });

viewsRouter.get("/", async (req, res) => {
  try {
    const products = await productsManager.read();
    return res.status(200).render("home", { products, title: "HOME" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/login", async (req, res) => {
  try {
    return res.status(200).render("login", { title: "LOGIN" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/register", async (req, res) => {
  try {
    return res.status(200).render("register", { title: "REGISTER" });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/profile/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const profile = await usersManager.readById(user_id);
    return res.status(200).render("profile", { title: "PROFILE", profile });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/product/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productsManager.readById(product_id);
    return res
      .status(200)
      .render("product", { title: product.title.toUpperCase(), product });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/cart/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const carts = await cartsManager.readProductsFromUser(user_id);
    const total = await cartsManager.totalToPay(user_id);
    return res.status(200).render("cart", { title: "CART", carts, total: total[0].total });
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});
viewsRouter.get("/verify", (req, res) => {
  try{
  res.render("verify");
  } catch (error) {
    console.log(error);
    return res.status(500).render("error");
  }
});




export default viewsRouter;