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
    latitude: { type: Number, required: true },  // These are useful, but won't be used directly for geospatial queries
    longitude: { type: Number, required: true },

    // GeoJSON location field to support geospatial queries
    location: {
        type: {
            type: String,
            enum: ['Point'],  // GeoJSON requires 'Point' type for location
            required: true,
        },
        coordinates: {
            type: [Number],  // [longitude, latitude]
            required: true,
        }
    }
}, { timestamps: true });

// Create a geospatial index on the `location` field
AddressSchema.index({ location: "2dsphere" });

export default mongoose.model('Address', AddressSchema);
