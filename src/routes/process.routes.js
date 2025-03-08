import CustomRouter from "../utils/CustomRouter.util.js";
import {readArgs,readDataOfProcess,sumCallback} from "../controllers/process.controller.js";
class ProcessRouter extends CustomRouter{
    constructor(){
        super();
        this.init();
        }
    init = () => {
        this.read("/", ["PUBLIC"], readDataOfProcess);
        this.read("/args",["PUBLIC"], readArgs);
        // this.read("/sum",["PUBLIC"], sumCallback);
        this.read("/sum",["PUBLIC"], sumCallback);

    }
}
const processRouter = new ProcessRouter();
export default processRouter.getRouter();
