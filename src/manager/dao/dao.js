import argsUtil from "../../utils/args.util.js";
const {pers} = argsUtil;

let dao = {}
switch (pers) {
    case "memory":{
        console.log("memory database")
        const {productsManager,cartManager, usersManager} = await import("./memory/manager.memory.js")
        dao = {productsManager,cartManager,usersManager}
    }
        break;
        case "fs":{
            console.log("fs database")
            const {productsManager,cartManager, usersManager} = await import("./fs/manager.fs.js")
            dao = {productsManager,cartManager,usersManager}
            }
            break;
    default:
        console.log("mongo database")
        const {productsManager, cartManager,usersManager} = await import("./mongo/manager.mongo.js")
        dao = {productsManager,cartManager,usersManager}
        break;
}
const {productsManager,cartManager, usersManager} = dao;
export {productsManager,cartManager, usersManager};
export default dao;