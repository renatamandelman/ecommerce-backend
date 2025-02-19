import { Router } from "express";
import passportCb from "../middlewares/passportCallback.mid.js";
const authRouter = Router();
const login = async (req, res, next) => {
  try {
    const { token, user } = req;
    return res
      .status(200)
      .cookie("token", token, opts)
      .json({ message: "logged in", response: user });
  } catch (error) {
    next(error);
  }
};
const signout = (req, res, next) => {
  try {
    return res.status(200).clearCookie("token").json({ message: "signed out" });
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    /*la callback done si todo esta bien, agrega al objeto 
    de requerimients los datos del usuario */
    const user = req.user;
    return res.status(201).json({ message: " registered", response: user });
  } catch (error) {
    next(error);
  }
};
const online = async (req, res, next) => {
  try {
    const { user_id } = req.session;
    if (!user_id) {
      const error = new Error("its not online");
      error.statusCode = 401;
      throw error;
    }
    return res.status(201).json({ message: "its online" });
  } catch (error) {
    next(error);
  }
};
const google = async (req, res, next) => {
  try {
    const { token, user } = req;
    return res
      .status(200)
      .json({ message: "Logged in with Google", response: { token, user } });
  } catch (error) {
    next(error);
  }
};
const failure = (req, res) => {
  return res.status(401).json({ message: "Google Error" });
};

authRouter.post(
  "/login",
  passportCb("login"),
  login
);
authRouter.post(
  "/signout",
  passportCb("jwt-auth"),
  signout
);
authRouter.post(
  "/register",
  passportCb("register"),
  register
);
authRouter.post("/online",passportCb("jwt-auth"), online);
authRouter.get(
  "/google",
  passportCb("google")
);
authRouter.get(
  "/google/callback",
  passportCb("google"),
  google
);
authRouter.get("/google/failure", failure);
export default authRouter;
