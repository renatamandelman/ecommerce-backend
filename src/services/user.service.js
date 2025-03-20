import { usersManager } from "../manager/dao/dao.js";
import UserDto from "../manager/dto/users.dto.js";
import { createToken } from "../utils/token.util.js";
import crypto from "crypto";
import { createHash } from "../utils/hash.util.js"
import verifyAccount from "../utils/nodemailer.util.js";
class UserService {
  createUser = async (data) => await usersManager.create(new UserDto(data));
  readAllUser = async () => await usersManager.read();
  readOneUser = async (uid) => await usersManager.readById(uid);
  updateUser = async (uid, data, opt) => await usersManager.updateById(uid, data, opt);
  deleteUser = async (uid) => await usersManager.destroyById(uid);
  verify = async(email,code) => {
    const user = await usersManager.readBy({email});
    const verify = code === user?.verifyCode
    if(verify){
    await usersManager.updateById(user._id, {verify})
    }
    return verify;
  }
  restore = async (email) => {
    const user = await usersManager.readBy({email});

      const restoreCode = crypto.randomBytes(12).toString("hex");
      await usersService.updateUser(user._id, { restoreCode });
        await verifyAccount(email, restoreCode, "Reset your coder commerce account");
  
  }
   reset = async (email, restoreCode, newPassword) => {
    const user = await usersManager.readBy({ email });
      const validReset = restoreCode === user.restoreCode;
    if (!validReset) {
      return { success: false, error: "Invalid restore code" };
    }
    const hashedPassword = createHash(newPassword); 
    await usersService.updateUser(user._id, { password: hashedPassword, restoreCode: null }); 
  
    return hashedPassword;
  };
  
 
}

const usersService = new UserService();
export default usersService;
