import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    avatar: {type:String, default: "user.png"},
    email: { type: String, required: true, index: true, unique: true },
    age: { type: Number },
    password: { type: String, required: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    verifyCode: {type:String,requiered:true},
    verify: {type:Boolean, default:false},
    restoreCode: {type:String}
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;