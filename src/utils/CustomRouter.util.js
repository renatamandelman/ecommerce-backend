import { Router } from "express";
import { decodeToken } from "./token.util.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.setupResponses();
    this.policies();
  }
  getRouter = () => this.router;
  applyMidds = (middlewares) =>
    middlewares.map((each) => async (req, res, next) => {
      try {
        await each(req, res, next);
      } catch (error) {
        next(error);
      }
    });
  setupResponses = () => {
    this.use((req, res, next) => {
      const succesResponse = (statusCode, response, message) => {
        res.status(statusCode).json({
          method: req.method,
          url: req.url,
          message: message,
          response: response,
        });
      };
      const errorResponse = (statusCode, error) => {
        res.status(statusCode).json({
          method: req.method,
          url: req.url,
          error: message,
        });
      };
      res.json200 = (response = null, message = "Succes") =>
        succesResponse(200, response, message);
      res.json201 = (response = null, message = "Created") =>
        succesResponse(201, response, message);
      res.json400 = (message = "Client Error") => errorResponse(400, message);
      res.json401 = (message = "Bad Auth") => errorResponse(401, message);
      res.json403 = (message = "Forbidden") => errorResponse(403, message);
      res.json404 = (message = "Not Found") => errorResponse(404, message);
      res.json500 = (message = "Internal Server Error") =>
        errorResponse(500, message);
      next();
    });
  };
  policies = (policies) => async (req, res, next) => {
    try {
      if (policies.includes("PUBLIC")) return next();

      const token = req?.cookies?.token;

      if (!token) return res.json401();

      const data = decodeToken(token);

      const { role, user_id } = data;

      if (!role || !user_id) return res.json401();

      if (
        (policies.includes("USER") && role === "USER") ||
        (policies.includes("ADMIN") && role === "ADMIN")
      ) {
        const user = await readById(user_id);

        if (!user) return res.json401();

        req.user = user;

        return next();
      }

      return res.json403();
    } catch (error) {
      return res.json400(error.message);
    }
  };
  /* metodo encargado de crear una solicitud de tipo post, usando la palabra de la variable path y todos los middleware que me envien luego */
  create = (path,policies, ...middlewares) =>
    this.router.post(path, this.policies(policies), this.applyMidds(middlewares));
  read = (path,policies, ...middlewares) =>
    this.router.get(path,this.policies(policies), this.applyMidds(middlewares));
  update = (path,policies, ...middlewares) =>
    this.router.put(path,this.policies(policies), this.applyMidds(middlewares));
  destroy = (path,policies, ...middlewares) =>
    this.router.delete(path,this.policies(policies), this.applyMidds(middlewares));
  use = (path,policies, ...middlewares) =>
    this.router.use(path,this.policies(policies), this.applyMidds(middlewares));
}

export default CustomRouter;
