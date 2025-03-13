import CustomRouter from "../utils/CustomRouter.util.js";
import productsRoutes from "./products.routes.js";
import cartRoutes from "./carts.routes.js";
import { userRoleMiddleware } from "../middlewares/userRoleMiddleware.js";
import viewsRouter from "./views.routes.js";
import usersRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import processRouter from "./process.routes.js";

class ApiRouter extends CustomRouter{
    constructor(){
        super();
        this.init();
        }
        init = () =>{
            this.use("/cart",["PUBLIC"], cartRoutes);
            this.use("/views", ["PUBLIC"],viewsRouter);
            this.use("/users",["PUBLIC"], usersRouter);
            this.use("/auth",["PUBLIC"], authRouter);
            this.use("/productsV",["PUBLIC"], productsRoutes);
            this.use("/process",["PUBLIC"],processRouter);

        }
}
const router = new ApiRouter();
export default router.getRouter();