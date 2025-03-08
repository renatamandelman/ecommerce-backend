import User from "../../../models/user.model.js";
import ProductModel from "../../../models/product.model.js";
import CartModel from "../../../models/cart.model.js";
class MongoManager {
    constructor(model) { this.model = model }
    create = async (data) => await this.model.create(data);
    read = async (filter) => await this.model.find(filter);
    readBy = async (data) => await this.model.findOne(data);
    readById = async (id) => await this.model.findOne({ _id: id });
    updateById = async (id, data) => await this.model.findOneAndUpdate({ _id:id }, data, { new:true });
    destroyById = async (id) => await this.model.findOneAndDelete({ _id: id });
   }
   
   const productsManager = new MongoManager(ProductModel);
   const usersManager = new MongoManager(User);
   const cartsManager = new MongoManager(CartModel);
   
   export {productsManager,cartsManager,usersManager };
   export default MongoManager;