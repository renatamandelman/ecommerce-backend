import CustomRouter from "../utils/CustomRouter.util.js";
import { ProductManager } from "../manager/productManager.js";
import ProductModel from "../models/product.model.js";
// import { create } from "connect-mongo";
import passportCb from "../middlewares/passportCallback.mid.js";

const productsManager = new ProductManager();

//metodo get

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
  const product = await productsManager.getProductById(pid);

  if (!product)
    return res.json404("Product not found" );
    
  res.json200(product);
};
// metodo post
const createProduct = async (req, res) => {
  const body = req.body;

  const products = await productsManager.addProduct(body);
  if (!products)
    return res.json404("product Not Found");

  res.json201(products);
};
const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const body = req.body;

  const product = await productsManager.updateProduct(pid, body);

  res.json200(product, "updated product" );
};
const deleteOneProduct = async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await productsManager.deleteProduct(pid);
  if (!deleteProduct)
    return res
      .json404
     ( "Product not found");
  res.json200(deleteProduct, "deleted product");
};

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/",["ADMIN"], createProduct);
    this.read("/",["PUBLIC"], readAllProducts);
    this.read("/:pid", ["PUBLIC"],readProduct);
    this.update("/:pid", ["ADMIN"],updateProduct);
    this.destroy("/pid",["ADMIN"], deleteOneProduct);
  };
}
const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
