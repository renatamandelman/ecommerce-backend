import { usersManager } from "../manager/dao/dao.js";
import UserDto from "../manager/dto/users.dto.js";
class UserService {
  createUser = async (data) => await usersManager.create(new UserDto(data));
  readAllUser = async () => await usersManager.read();
  readOneUser = async (uid) => await usersManager.readById(uid);
  updateUser = async (uid, data, opt) => await usersManager.updateById(uid, data, opt);
  deleteUser = async (uid) => await usersManager.destroyById(uid);
}

const usersService = new UserService();
export default usersService;
