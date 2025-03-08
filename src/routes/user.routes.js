import {
  createUser,
  readAllUser,
  readOneUser,
  updateOneUser,
  destroyOneUser,
} from "../controllers/users.controller.js";
import CustomRouter from "../utils/CustomRouter.util.js"
import passportCb from "../middlewares/passportCallback.mid.js";

class UsersRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["PUBLIC"], createUser);
    this.read("/", ["ADMIN"], readAllUser);
    this.read("/:uid", ["ADMIN", "USER"], readOneUser);
    this.update(":uid/",["USER", "ADMIN"],passportCb("jwt-auth"), updateOneUser);
    this.destroy("/",["USER", "ADMIN"],passportCb("jwt-auth"),destroyOneUser);
  };
}
const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
