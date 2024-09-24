import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'rest_owner', 'delivery_boy'], default: 'customer' },
    img: { type: String },
    createdAt: {
        type: Date,
        default: Date.now,  // Correct usage of Date.now as a function reference
    },
    location: { 
        // Correctly defining the location subfields
        id:{type:String},
        latitude: { type: Number },
        longitude: { type: Number },
        address: { type: String }
    }
},{timestamps:true}
);

export default mongoose.model("User", UserSchema);
