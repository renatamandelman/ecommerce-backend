import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: {
        type:String, required:true
    },
    description: {
        type:String, required:true
    },
    price: {
        type:Number, required:true, default:1
    },
    img: {
         type:String, default: "iphone15.png"
    },
    code: {
        type:String, required:true, unique:true
    },
    stock: {
        type:Number, required:true, default:1
    },
    category: {
        type:String, required:true, default:"electronics"
    },
    status: {
        type:Boolean, required:true
    },
    thumbnail: {
        type:[String]
    }
});
productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;