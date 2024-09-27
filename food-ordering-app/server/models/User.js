import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'restaurant_owner', 'delivery_boy'], default: 'customer' },
    img: { type: String },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }  // Reference to Address
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
