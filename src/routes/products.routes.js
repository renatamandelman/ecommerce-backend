import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";
import ProductModel from '../models/product.model.js';


// Ejecutar nuestro router
const router = Router();

const productsManager = new ProductManager();

//metodo get

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "";
  const query = req.query.query || null;
  let filter = {};
  if (query) {
    filter = {
      $or: [
        { category: query },     // Filtrar por categoría
        { availability: query }  // Filtrar por disponibilidad
      ]
    };
  }
  try {
    const productsListado = await ProductModel.paginate(filter,
      {
        page,
        limit,
        sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
      }
    );
    console.log(productsListado); // Verifica los datos de paginación

    const products = productsListado.docs.map((product) => {
      const { _id, ...rest } = product.toObject();
      return rest;
     });
     
     
     res.render("home",{
         products,
        totalPages: productsListado.totalPage,
        prevPage: productsListado.prevPage,
        nextPage: productsListado.nextPage,
        page: productsListado.currentPage,
        hasPrevPage: productsListado.hasPrevPage,
        hasNextPage: productsListado.hasNextPage,
        prevLink: productsListado.hasPrevPage ? productsListado.PrevLink : null,
        nextLink: productsListado.hasNextPage ? productsListado.NextLink : null,
      } );
  
  }catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
}
});
//get By Id

router.get("/:pid", async (req, res) => {
try{
  const { pid } = req.params;
  const product = await productsManager.getProductById(pid);

  if (!product)
    return res.status(404).json({ status: "error", message: "Product not found" });

  res.status(200).json({ status: "ok", payload: product });
}catch (error) {
  console.error("Error al obtener los productos:", error);
  res.status(500).json({ status: 'error', message: `Error al obtener el producto ${pid}` });
}
});
// metodo post
router.post("/", async (req, res) => {
  try{
  const body = req.body;

  const products = await productsManager.addProduct(body);
  if (!products)
    return res.status(404).json({ status: "error", message: "error" });

  res.status(201).json({ status: "ok", payload: products });
}catch (error) {
  console.error("Error al crear el producto", error);
  res.status(500).json({ status: 'error', message: 'Error al crear el producto' });
}
});
router.put("/:pid", async (req, res) => {
  try{
  const { pid } = req.params;
  const body = req.body;

  const product = await productsManager.updateProduct(pid, body);

  res.status(200).json({ status: "ok", payload: product });
  }catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ status: 'error', message: 'Error al actualizar el producto' });
}
});
router.delete("/:pid", async (req, res) => {
  try{
  const { pid } = req.params;
  const deleteProduct = await productsManager.deleteProduct(pid);
  if (!deleteProduct) return res.status(404).json({ status: "error", message: "Product not found" });
  res.status(200).json({ status: "ok", payload: deleteProduct });
  }catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto' });
}
});

// router.get("/realTimeProducts", async (req,res) => {
//   const products = await productsManager.getProducts();
//   req.io.emit("products",products);
//   res.status(200).json({ status: "ok", payload: products });

// });
export default router;
