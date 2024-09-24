import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:'User',required:true},
    productId:{type:mongoose.Schema.ObjectId,ref:'Food',required:true},
    additives:{type:Array,required:false,default:[]},
    totalPrice:{type:Number,required:true},
    quantity:{type:Number,required:true},
},{timestamps:true});

export default mongoose.model("Cart",CartSchema);