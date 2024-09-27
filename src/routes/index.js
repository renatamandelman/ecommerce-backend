import { Router } from "express";
import productsRoutes from "./products.routes.js";
import cartRoutes from "./carts.routes.js";
import { userRoleMiddleware } from "../middlewares/userRoleMiddleware.js";

const router = Router();

router.use("/cart", cartRoutes);
//middleWare a nivel router
router.use(userRoleMiddleware);
router.use("/products", productsRoutes);

export default router;