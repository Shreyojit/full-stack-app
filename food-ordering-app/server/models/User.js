import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    addressLine: { type: String, required: true },
    postalCode: { type: String, required: true },
    default: { type: Boolean, default: false },
    location: {
        type: {
            type: String,
            enum: ['Point'],  // Must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],  // Array of numbers (longitude, latitude)
            required: true
        }
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, { _id: false }); // Disable automatic creation of _id for this subdocument

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'restaurant_owner', 'delivery_boy'], default: 'customer' },
    img: { type: String },
    address: AddressSchema  // Embed the AddressSchema directly
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
