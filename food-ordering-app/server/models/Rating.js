import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ratingType: { type: String, required: true, enum: ['Restaurant', 'Driver', 'Food'] },
    value: { type: Number, required: true, min: 1, max: 5 },
    imageUrl: { type: String },
    feedback: { type: String }
}, { timestamps: true });

export default mongoose.model('Rating', RatingSchema);
