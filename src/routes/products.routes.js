import CustomRouter from "../utils/CustomRouter.util.js";
import {deleteOneProduct,updateProduct,readAllProducts,readProduct,createProduct} from "../controllers/products.controller.js";


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
