import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    additives: [{ type: String }],
    instructions: { type: String, default: '' }
});

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    orderItems: [orderItemSchema],
    orderTotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    restaurantAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'Pending', enum: ['Pending', 'Completed', 'Failed'] },
    orderStatus: { type: String, default: 'Pending', enum: ['Pending', 'Accepted', 'Preparing', 'On the way', 'Delivered', 'Cancelled', 'Ready', 'Out for Delivery'] },
    restaurantCoords: [Number],
    recipientCoords: [Number],
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },  // Relation to Delivery boy
    rating: { type: Number, min: 1, max: 5, default: 3 },
    feedback: { type: String },
    promoCode: { type: String },
    discountAmount: { type: Number },
    notes: { type: String }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);
