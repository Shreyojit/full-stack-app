import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    title:{type:String,required:true},
    time:{type:String,required:true},
    foodTags:{type:Array,required:True},
    category:{type:String,required:true},
    code:{type:String,required:true},
    isAvailable:{type:String,required:true},
    restaturant:{type:mongoose.Schema.Types.ObjectId,required:true},
    rating:{type:Number,min:1,max:5,default:3},
    ratingCount:{type:String,default:"32"},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    additive:{type:Array,default:true},
    imageUrl:{type:String,required:true},
});

export default mongoose.model("Food",FoodSchema);