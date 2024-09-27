import mongoose from 'mongoose';

// Schema for Weekday Opening Hours
const WeekdayHoursSchema = new mongoose.Schema({
    day: { type: String},  // Required: Name of the day (e.g., "Monday")
    start_time: { type: String, default: "09:00" },  // Default: Opening time (9 AM)
    end_time: { type: String, default: "22:00" }     // Default: Closing time (10 PM)
}, { _id: false });  // Disable _id for embedded schema

// Schema for Weekend Opening Hours
const WeekendHoursSchema = new mongoose.Schema({
    day: { type: String, required: true },  // Required: Day of the week (e.g., "Saturday", "Sunday")
    start_time: { type: String, default: null },  // Optional: Opening time (null if closed)
    end_time: { type: String, default: null },    // Optional: Closing time (null if closed)
    isOpen: { type: Boolean, default: false }     // Flag to indicate if the restaurant is open
}, { _id: false });  // Disable _id for embedded schema

// Main Restaurant Schema
const RestaurantSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Required: Restaurant title
    openingHours: {
        weekday: { type: [WeekdayHoursSchema], required: true },  // Required: Array for weekday hours
        weekend: { type: [WeekendHoursSchema], required: true }   // Required: Array for weekend hours
    },
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],  // Reference to Food
    pickup: { type: Boolean, default: true },  // Default: Pickup available
    delivery: { type: Boolean, required: true },  // Required: Delivery option
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Required: Owner reference
    rating: { type: Number, min: 1, max: 5, default: 3 },  // Default rating
    logoUrl: { type: String, required: true },  // Required: Logo URL
    code: { type: String, unique: true },  // Optional: Restaurant code (unique)
    ratingCount: { type: Number, default: 0 },  // Default: No ratings yet
    verification: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },  // Default verification status
    verificationMessage: { type: String, default: "Your restaurant is under review, we'll notify you soon!" },  // Default message
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }  // Required: Reference to Address
}, { timestamps: true });  // Automatically manage createdAt and updatedAt timestamps

export default mongoose.model('Restaurant', RestaurantSchema);
