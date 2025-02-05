import { Router } from "express";
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

})