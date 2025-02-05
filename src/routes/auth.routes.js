import { Router } from "express";
import passport from "../middlewares/passport.mid.js";
const authRouter = Router();
const login = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({ message: "logged in" });
  } catch (error) {
    next(error);
  }
};
const signout = (req, res, next) => {
  try {
    req.session.destroy();
    return res.status(200).json({ message: "logged in" });
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
  passport.authenticate("login", { session: false }),
  login
);
authRouter.post("/signout", signout);
authRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  register
);
authRouter.post("/online", online);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/google/failure",
  })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/google/failure",
  }),
  google
);
authRouter.get("/google/failure", failure);
export default authRouter;
