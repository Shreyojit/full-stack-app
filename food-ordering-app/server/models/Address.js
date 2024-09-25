import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    ownerId: {  // This will store the ObjectId of either a User or a Restaurant
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'ownerModel'  // Dynamically reference the model
    },
    ownerModel: {  // This stores the model name (User or Restaurant)
        type: String,
        required: true,
        enum: ['User', 'Restaurant']  // Valid models for ownerId
    },
    addressLine: { type: String, required: true },
    postalCode: { type: String, required: true },
    default: { type: Boolean, default: false },
    deliveryInstructions: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Address', AddressSchema);
