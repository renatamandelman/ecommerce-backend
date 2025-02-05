import jwt from "jsonwebtoken";

const createToken = (data) => {
	const token = jwt.sign(
	//informacion a tokenizar
		data,
	//clave secreta para tokenizar
		process.env.JWT_KEY,
	//tiempo de expiracion en segs
	{expiresIn: 60 * 60 *24 * 7}
	)
	return token;
};
//se puede decodificar

const decodeToken = (headers) => {
	const authHeader = headers["authorization"];
	if(!authHeader || !authHeader.startsWith("Bearer")) {
	const error = new Error("token is required");
	error.statusCode = 401;
	throw new Error("error")
	}
	const token = authHeader.split("")[1]// lo corto en el espacio donde esta el bearer
	//condicionar si no existe el token opcional
	const decodeData = jwt.verify(token);
	return decodeData;
}

export {createToken, decodeToken};

