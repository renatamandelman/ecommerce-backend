import jwt from "jsonwebtoken";

const createToken = (data) => {
	const token = jwt.sign(
	//informacion a tokenizar
		data,
	//clave secreta para tokenizar
		process.env.JWT_KEY,
	//tiempo de expiracion en segs
	{expiresIn: 10}
	)
	return token;
};
//se puede decodificar

// const decodeToken = (headers) => {
// 	const authHeader = headers["authorization"];
// 	if(!authHeader || !authHeader.startsWith("Bearer")) {
// 	const error = new Error("token is required");
// 	error.statusCode = 401;
// 	throw new Error("error")
// 	}
// 	const token = authHeader.split("")[1]// lo corto en el espacio donde esta el bearer
// 	//condicionar si no existe el token opcional
// 	const decodeData = jwt.verify(token);
// 	return decodeData;
// }
// const decodeToken = (cookies) => {
// 	const tokenInCookie = cookies.token;
// 	if (!tokenInCookie) {
// 	  const error = new Error("Token is required");
// 	  error.statusCode = 401;
// 	  throw error;
// 	}
// 	const decodeData = jwt.verify(tokenInCookie, process.env.JWT_KEY);
// 	return decodeData;
//   };
const decodeTokenFromHeaders = (headers) => {
	try {
	  const authHeader = headers["authorization"];
	  if (!authHeader || !authHeader.startsWith("Bearer ")) {
		const error = new Error("Token is required");
		error.statusCode = 401;
		throw error;
	  }
	  const token = authHeader.split(" ")[1];
	  const decodeData = jwt.verify(token, process.env.JWT_KEY);
	  return decodeData;
	} catch (error) {
	  error.statusCode = 401;
	  throw error;
	}
  };
  const decodeToken = (token) => {
	  const decodeData = jwt.verify(token, process.env.JWT_KEY);
	  return decodeData;
	} 
  const verifyToken = (token) => {
	try {
	  const decodeData = jwt.verify(token, process.env.JWT_KEY);
	  return decodeData;
	} catch (error) {
	  error.statusCode = 401;
	  throw error;
	}
  };
export {createToken, decodeToken,decodeTokenFromHeaders};

