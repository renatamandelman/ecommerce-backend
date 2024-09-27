export const userRoleMiddleware = (req,res,next) => { 
    const {role} = req.body;

//Validar que el usuario sea el admin
if(role !== "admin") return res.status(403).json({status:"error", error:"usuario no autorizado"})
// si el usuario tiene el role admin entonces continua la ejecucion
next();
};