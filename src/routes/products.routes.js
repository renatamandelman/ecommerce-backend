import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";


// Ejecutar nuestro router
const router = Router();

const productsManager = new ProductManager();

//metodo get
router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  res.status(200).json({ status: "ok", payload: products });
});
//get By Id

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productsManager.getProductById(Number(pid));

  if (!product)
    return res.status(404).json({ status: "error", message: "Product not found" });

  res.status(200).json({ status: "ok", payload: product });
});
// metodo post
router.post("/", async (req, res) => {
  const body = req.body;

  const products = await productsManager.addProduct(body);
  if (!products)
    return res.status(404).json({ status: "error", message: "error" });

  res.status(201).json({ status: "ok", payload: products });
});
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const body = req.body;

  const product = await productsManager.updateProduct(Number(pid), body);

  res.status(200).json({ status: "ok", payload: product });
});
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await productsManager.deleteProduct(Number(pid));
  if (!deleteProduct) return res.status(404).json({ status: "error", message: "Product not found" });
  res.status(200).json({ status: "ok", payload: deleteProduct });
});

// router.get("/realTimeProducts", async (req,res) => {
//   const products = await productsManager.getProducts();
//   req.io.emit("products",products);
//   res.status(200).json({ status: "ok", payload: products });

// });
export default router;
