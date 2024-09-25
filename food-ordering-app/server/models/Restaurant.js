import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, default: 3 },
    logoUrl: { type: String, required: true },
    code: { type: String },
    ratingCount: { type: Number, default: 12 },
    verification: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    verificationMessage: { type: String, default: "Your restaurant is under review, we'll notify you soon!" },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }  // Reference to Address
}, { timestamps: true });

export default mongoose.model('Restaurant', RestaurantSchema);
