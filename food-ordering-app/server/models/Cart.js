import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    additives: [{ type: String, default: [] }],
    totalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);
