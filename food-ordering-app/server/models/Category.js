import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title:{type:String,required:true},
    value:{type:String,required:true},
    imageUrl:{type:String,required:true},
    
})

export default mongoose.model('Category',CategorySchema)