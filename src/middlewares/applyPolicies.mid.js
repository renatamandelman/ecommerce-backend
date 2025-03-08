import { usersManager } from "../manager/dao/dao.js";
import { verifyToken } from "../utils/token.util.js";

const applyPolicies = (policies) => async (req, res, next) => {
  try {
    // console.log("Policies received:", policies);
    
    // if (!Array.isArray(policies)) {
    //   console.error("🚨 Policies is not an array:", policies);
    //   return res.json500("Server error: Invalid policies format");
    // }
    console.log(policies)
    console.log(policies.includes())
    if (policies.includes("PUBLIC")) return next();

    const token = req?.cookies?.token;

    if (!token) return res.json401();

    const data = decodeToken(token);

    const { role, user_id } = data;

    if (!role || !user_id) return res.json401();
    const allowedRolles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };
    if (allowedRolles[role]) {
      const user = await usersManager.readById(user_id);
      if (!user) return res.json401();
      req.user = user;
      return next();
    }

    return res.json403();
  } catch (error) {
    return res.json400(error.message);
  }
};

export default applyPolicies;
