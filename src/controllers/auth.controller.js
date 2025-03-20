import nodemailerUtil from "../utils/nodemailer.util.js";
import usersService from "../services/user.service.js";
import { verifyToken } from "../utils/token.util.js";
import verifyAccount from "../utils/nodemailer.util.js";
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
const nodemailer = async (req,res) => {
  const {email} = req.params;
  await nodemailerUtil(email);
  res.json200(null, "verify email sent");
}
const verify = async(req,res) => {
  const {email, code} = req.body;
  const user = await usersService.verify(email,code);
  if(!user){
    res.json401()
  }else{
    res.json200(null, "email verified")
  }
}
const forgotPassword = async (req, res) => {
  const { email } = req.body;
const user = await usersService.restore(email);
if(!user){
  res.json401()
}else{
  res.json200(null, "email reset sent")
}  
};
const resetPassword = async (req,res) => {
  const {email, restoreCode, newPassword} = req.body;
  const user = await usersService.reset(email, restoreCode, newPassword);
  if(!user){
    res.json401()
    }else{
      res.json200(null, "password reset")
      }
}

export {register,login,signout,online,google,failure,nodemailer, verify,forgotPassword,resetPassword}