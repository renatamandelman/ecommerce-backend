import CustomRouter from "../utils/CustomRouter.util.js";
import argsUtil from "../utils/args.util.js";
const readDataOfProcess = (req,res) => {
	const {pid,argv,env} = process
	res.json200({pid,argv,env})

}
const readArgs = (req,res) => res.json200(argsUtil);
class ProcessRouter extends CustomRouter{
    constructor(){
        super();
        this.init();
        }
    init = () => {
        this.read("/", ["PUBLIC"], readDataOfProcess);
        this.read("/args",["PUBLIC"], readArgs)
    }
}
const processRouter = new ProcessRouter();
	export default processRouter.getRouter();
