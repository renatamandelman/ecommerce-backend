import argsUtil from "../../utils/args.util.js";
import crypto from "crypto";
const { pers } = argsUtil;

class ProductDto {
  constructor(data) {
    if (pers !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.title = data.title;
    this.description = data.description;
    this.category = data.category || "Laptop";
    this.image = data.image || "laptop.png";
    this.price = data.price || 10;
    this.stock = data.stock || 10;
    this.onsale = data.onsale || false;
    this.owner_id = data.owner_id;

    if (pers !== "mongo") {
      this.createAt = new Date();
      this.updateAt = new Date();
    }
  }
}
export default ProductDto;