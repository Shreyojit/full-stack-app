const AddressSchema = new mongoose.Schema({
    ownerId: {  // Stores ObjectId of either a User or Restaurant
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'ownerModel'  // Dynamically reference the model
    },
    ownerModel: {  // Stores the model name (User or Restaurant)
        type: String,
        required: true,
        enum: ['User', 'Restaurant']  // Valid models for ownerId
    },
    addressLine: { type: String, required: true },
    postalCode: { type: String, required: true },
    default: { type: Boolean, default: false },
    deliveryInstructions: { type: String },
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
}, { timestamps: true });

// Ensure indexes are created for geospatial queries
AddressSchema.index({ location: '2dsphere' });

export default mongoose.model('Address', AddressSchema);
