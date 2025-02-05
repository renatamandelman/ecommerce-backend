import { Router } from "express";
const cookiesRouter = Router();


cookiesRouter.get("/", (req,res,next) => {
	try{
		const cookies = req.cookies;
		const {role} = req.cookies;
		const response = {message:"cookie vence en 10 seg"};
		return res.status(200).json(role,cookies);
	
	}catch(error){
	next(error)
	}
})
//para las cookies firmadas que se vencen en un tiempo
cookiesRouter.get("/signed", (req,res,next) => {
	try{
		const cookies = req.signedCookies;
		const {user_id} = req.signedCookies;
		return res.status(200).json(user_id, cookies);
	
	} catch(error){
	next(error)
	}
})
cookiesRouter.post("/", (req,res,next) => {
	try{
		const maxAge = 10000;
		const response = {message:"cookie vence en 10 seg"};
		return res.status(200).cookie
		("role","user").cookie
		("mode", "dark",
		 {maxAge}).json(response);
	
	} catch(error){
	next(error)
	}
})

cookiesRouter.post("/signed", (req,res,next) => {
	try{
		const maxAge = 10000;
		const response = {message:"cookie vence en 10 seg"};
		return res.status(200)
        .cookie("user_id", "123456", {maxAge, signed:true})
        .json(response);
	
	}catch(error){
	next(error)
	}
});
//se puede hacer con delete o post tmb esto
cookiesRouter.get("/clear", (req,res,next) => {
	try{
	//si quiero borrar una o mas
		return res.status(200).
		clearCookie("mode").
		clearCookie("role").
		json({message:"cookie eliminada"});
	
	}catch(error){
	next(error)
	}
})