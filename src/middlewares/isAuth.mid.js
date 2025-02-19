import {decodeToken, decodeTokenFromHeaders} from "../utils/token.util.js"
import User from "../models/user.model.js"

const isAuth = async (req,res,next) => {
try{
const data = decodeTokenFromHeaders(req.headers)
const {email} = data
const user = await User.findOne(email);
if(!user) {
const error = new Error("invalid credentials");
error.statusCode = 401
throw error

}
req.user = user;
next()
}catch(error){
    next(error);
}

}
export default isAuth;