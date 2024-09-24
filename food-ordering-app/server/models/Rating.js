import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    ratingType:{type:String,required:true,enum:['Restaurant','Driver','Food']},
    value:{type:String,required:true},
    imageUrl:{type:String,required:true},
    rating:{type:Number,min:1,max:5}
});

export default mongoose.model('Rating',RatingSchema)