import { Router } from "express";
import passport from "../middlewares/passport.mid.js";
const sessionsRouter = Router();

sessionsRouter.post("/", (req,res,next) => {
	try
	{
	req.session.role = "ADMIN";
	req.session.mode = "dark";
	const response = {message: "session creada"}
	return res.status(200).json(response);
	}catch(error){
        next(error);
    }

});
sessionsRouter.get("/", (req,res,next) => {
	try
	{
	const response = {
	message: "session creada",
	session: req.session
	}
	return res.status(200).json(response);
	}catch(error){
        next(error);
    }

});
sessionsRouter.delete("/", (req,res,next) => {
	try
	{
	req.session.destroy;
	return res.status(200).json({message:"eliminado"});
	}catch(error){
        next(error);
    }

});
const current = (req,res,next) => { 
	try{
		const user = req.user;
		const token = req.token;
		return res.status(200).cookie("current", token).json({ message: "logged in", response: user });
	}catch(error){
		next(error);
	}
 }

 authRouter.post(
   "/current",
   passport.authenticate("login", { session: false }),
   current
 );