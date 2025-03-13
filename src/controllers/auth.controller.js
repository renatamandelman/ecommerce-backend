import nodemailerUtil from "../utils/nodemailer.util.js";
import usersService from "../services/user.service.js";
import { verifyToken } from "../utils/token.util.js";
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
  const { email } = req.params;

  const user = await usersService.restore(email);
  if (!user) return res.json404();

  const resetToken = createToken({ email }, "1h");

  await usersService.updateUser(user._id, { resetToken });

  const resetLink = `http://localhost:8080/reset-password?token=${resetToken}`;
  await nodemailerUtil(email, "Restaurar Contraseña", `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`);

  res.json200(null, "Recovery email sent");
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

    const decoded = verifyToken(token); 
    const user = await usersService.readOneUser({ _id: decoded.userId });

    if (!user) {
      return res.json404("User not found");
    }

    await usersService.updateUser(user._id, { password: newPassword });

    res.json200(null, "Password successfully reset");
};
export {register,login,signout,online,google,failure,nodemailer, verify,forgotPassword,resetPassword}