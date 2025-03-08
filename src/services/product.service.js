import { productsManager } from "../manager/dao/dao.js"
import ProductDto from "../manager/dto/product.dto.js";
class ProductService {
  createProduct = async (body) => await productsManager.create(new ProductDto(data));
//   readAllProducts = async () => await productsManager.read();
  readProduct = async (pid) =>  await productsManager.readById(pid);
  updateProduct = async (pid, body) => await productsManager.updateById(pid, body);
  deleteProduct = async (pid) => await productsManager.destroyById(pid);
   
}

const productsService = new ProductService();
export default productsService;
