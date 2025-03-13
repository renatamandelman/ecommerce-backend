import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        },
    products: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required : true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    state:{
        type:String,
        enum: ['reserved', 'paid', 'delivered'],
        default: 'reserved'
    }
});
//Middleware
cartSchema.pre("findOne", function(next){
    this.populate("products.product");
    next();
})
const CartModel = mongoose.model("carts", cartSchema);

export default CartModel;