import CustomRouter from "../utils/CustomRouter.util.js";
import passportCb from "../middlewares/passportCallback.mid.js";
import {register,login,signout,online,google,failure} from "../controllers/auth.controller.js";

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/signout",["USER","ADMIN"], signout);
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/online", ["USER","ADMIN"], online);
    this.read("/google", ["PUBLIC"],passportCb("google"));
    this.read("/google/callback",["PUBLIC"], passportCb("google"), google);
    this.read("/google/failure",["PUBLIC"], failure);
  };
}
const authRouter = new AuthRouter();

export default authRouter.getRouter();
