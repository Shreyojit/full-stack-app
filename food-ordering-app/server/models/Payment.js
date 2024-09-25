import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    method: { type: String, enum: ['Credit Card', 'PayPal', 'Cash on Delivery'], required: true },
    transactionId: { type: String }
}, { timestamps: true });

export default mongoose.model('Payment', PaymentSchema);
