import { usersManager } from "../manager/dao/dao.js";
import UserDto from "../manager/dto/users.dto.js";
import { createToken } from "../utils/token.util.js";
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
  restore = async(email) => {
    const user = await usersManager.readBy({email});
    if(user) return null;
    const resetToken = createToken({ email });
    await usersManager.updateById(user._id, {
      resetToken,
      resetTokenExp: Date.now() + 3600000, // 1 hora de validez
    });
  
    return resetToken;
  }
}

const usersService = new UserService();
export default usersService;
