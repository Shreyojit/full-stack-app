import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    title:{type:String,required:true},
    start_time:{type:String,required:true},
    end_time:{type:String,required:true},
    foods:{type:Array,default:[]},
    pickup:{type:Boolean,default:true},
    delivery:{type:Boolean,required:true},
    owner:{type:String,required:true},
    rating:{type:Number,min:1,max:5,default:3},
    logoUrl:{type:String,required:true},
    code:{type:String},
    ratingCount:{type:String,default:"12"},
    verification:{type:String,enum:["pending","verified","rejected"],default:"pending"},
    verifiactionMessage:{type:String,default:"Your restaurant is under review well notify soon!"},
    location: {  // Correctly defining the location subfields
       id:{type:String},
       latitude:{type:Number,required:true},
       longitude:{type:Number,required:true},
       latitudeDelta:{type:String,default:0.0122},
       longitudeDelta:{type:String,default:0.0122},
    },

});

export default mongoose.model('Restautrant',RestaurantSchema);