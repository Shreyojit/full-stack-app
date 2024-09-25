import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    time: { type: String, required: true },
    foodTags: [{ type: String, required: true }],
    category: { type: String, required: true },
    code: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },  // Relation to Restaurant
    rating: { type: Number, min: 1, max: 5, default: 3 },
    ratingCount: { type: Number, default: 32 },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    additives: [{ type: String, default: [] }],
    imageUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Food", FoodSchema);
