import CustomRouter from "../utils/CustomRouter.util.js";
import passportCb from "../middlewares/passportCallback.mid.js";

const login = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, hhtpOnly: true };
  res.cookie("token", token, opts).json200(user, "logged in");
};
const signout = (req, res) => {
  res.clearCookie("token").json200(null, "signed out");
};
const register = async (req, res) => {
  /*la callback done si todo esta bien, agrega al objeto 
    de requerimients los datos del usuario */
  const user = req.user;
  res.json201(user);
};
const online = async (req, res) => {
  const { user_id } = req.session;
  if (!user_id) {
    const error = new Error("its not online");
    error.statusCode = 401;
    throw error;
  }
  res.json201(null, "its online!");
};
const google = async (req, res) => {
  const { token, user } = req;
  const opts = { maxAge: 60 * 60 * 24 * 7 * 1000, hhtpOnly: true };
  res.cookie("token", token, opts).json200(user, "logged in with Google");
};
const failure = (req, res) => {
  return res.json401();
};
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
