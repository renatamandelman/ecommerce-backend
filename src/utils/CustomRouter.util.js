import { Router } from "express";
import { decodeToken } from "./token.util.js";
import applyPolicies from "./applyPolicies.mid.js";
class CustomRouter {
  constructor() {
    this.router = Router();
    this.use(this.setupResponses);
  
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
  
  /* metodo encargado de crear una solicitud de tipo post, usando la palabra de la variable path y todos los middleware que me envien luego */
  create = (path,policies, ...middlewares) =>
    this.router.post(path, applyPolicies(policies), this.applyMidds(middlewares));
  read = (path,policies, ...middlewares) =>
    this.router.get(path,applyPolicies(policies), this.applyMidds(middlewares));
  update = (path,policies, ...middlewares) =>
    this.router.put(path,applyPolicies(policies), this.applyMidds(middlewares));
  destroy = (path,policies, ...middlewares) =>
    this.router.delete(path,applyPolicies(policies), this.applyMidds(middlewares));
  use = (path,policies, ...middlewares) =>
    this.router.use(path,applyPolicies(policies), this.applyMidds(middlewares));
}

export default CustomRouter;
