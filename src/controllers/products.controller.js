import productsService from "../services/product.service.js";
import ProductModel from "../models/product.model.js";
const readAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "";
  const query = req.query.query || null;
  let filter = {};
  if (query) {
    filter = {
      $or: [
        { category: query }, // Filtrar por categoría
        { availability: query }, // Filtrar por disponibilidad
      ],
    };
  }
  const productsListado = await ProductModel.paginate(filter, {
    page,
    limit,
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
  });
  console.log(productsListado); // Verifica los datos de paginación

  const products = productsListado.docs.map((product) => {
    const { _id, ...rest } = product.toObject();
    return rest;
  });

  res.render("home", {
    products,
    totalPages: productsListado.totalPage,
    prevPage: productsListado.prevPage,
    nextPage: productsListado.nextPage,
    page: productsListado.currentPage,
    hasPrevPage: productsListado.hasPrevPage,
    hasNextPage: productsListado.hasNextPage,
    prevLink: productsListado.hasPrevPage ? productsListado.PrevLink : null,
    nextLink: productsListado.hasNextPage ? productsListado.NextLink : null,
  });
};
//get By Id

const readProduct = async (req, res) => {
  const { pid } = req.params;
  const product = await productsService.readProduct(pid)
  if (!product) return res.json404("Product not found");

  res.json200(product);
};
// metodo post
const createProduct = async (req, res) => {
  const body = req.body;
  const products = await productsService.createProduct(body);
  if (!products) return res.json404("product Not Found");

  res.json201(products);
};
const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const body = req.body;
  const product = await productsService.updateProduct(pid, body);
  res.json200(product, "updated product");
};
const deleteOneProduct = async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await productsService.deleteProduct(pid);
  if (!deleteProduct) return res.json404("Product not found");
  res.json200(deleteProduct, "deleted product");
};
// export
export {
  deleteOneProduct,
  updateProduct,
  readAllProducts,
  readProduct,
  createProduct,
};
