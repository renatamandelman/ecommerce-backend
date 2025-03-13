import argsUtil from "../../utils/args.util.js";
import crypto from "crypto";
import { createHash } from "../../utils/hash.util.js"
const { pers } = argsUtil;

class UserDto {
  constructor(data) {
    if (pers !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.name = data.name;
    this.date = data.date;
    this.email = data.email;
    this.password = createHash(data.password);
    this.avatar = data.avatar || "avatar.png";
    this.role = data.role || "USER";
    this.verifyCode = data.verifyCode;;
    this.verify = data.verify || false;

    if (pers !== "mongo") {
      this.createAt = new Date();
      this.updateAt = new Date();
    }
  }
}
export default UserDto;