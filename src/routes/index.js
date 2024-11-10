import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartRoutes from "./carts.routes.js";
import { userRoleMiddleware } from "../middlewares/userRoleMiddleware.js";
import viewsRouter from "./views.routes.js";
// import realTimeProducts from "../views/realTimeProducts.handlebars";
const router = Router();

router.use("/cart", cartRoutes);
router.use("/", viewsRouter);

//middleWare a nivel router
router.use(userRoleMiddleware);
router.use("/productsViews", productsRoutes);


export default router;