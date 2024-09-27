import Restaurant from "../models/Restaurant.js";
import moment from 'moment';

class RestaurantService {
    async findNearbyRestaurants(latitude, longitude) {
        const maxDistance = 5; // in kilometers
    
        const restaurants = await Restaurant.find({});
    
        const nearbyRestaurants = restaurants.filter(restaurant => {
            const distance = this.calculateDistance(
                latitude,
                longitude,
                restaurant.latitude,
                restaurant.longitude
            );
            return distance <= maxDistance;
        });
    
        return nearbyRestaurants;
    }
    
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in km
        const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = this.deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        const distance = R * c; // Distance in km
        return distance;
    }
    
    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    

    async createRestaurant(data) {
        // Fill in default opening hours for weekdays if not provided
        data.openingHours.weekday = this.fillDefaultWeekdayHours(data.openingHours.weekday);
        
        // Set weekend opening hours to closed if not provided
        this.setWeekendClosedHours(data.openingHours.weekend);
        
        // Check if weekend opening hours are valid
        this.checkWeekendHours(data.openingHours.weekend);
        
        // Create the restaurant instance with the validated data
        const restaurant = new Restaurant(data);
        return await restaurant.save();
    }
    
    // Fill default opening hours for weekdays if not provided
    fillDefaultWeekdayHours(weekdayHours) {
        const defaultStartTime = "09:00"; // Default start time
        const defaultEndTime = "22:00";   // Default end time
    
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const filledWeekdayHours = [];
    
        // Iterate over each day and apply the defaults or existing times
        days.forEach((day, index) => {
            const existingHours = weekdayHours[index] || {};
    
            // Push the object with default or given start_time/end_time for each day
            filledWeekdayHours.push({
                day: day,
                start_time: existingHours.start_time || defaultStartTime,
                end_time: existingHours.end_time || defaultEndTime
            });
        });

        return filledWeekdayHours;
    }
    
    
    // Set weekend hours to closed if not provided
setWeekendClosedHours(weekendHours) {
    const defaultClosed = {
        start_time: null,
        end_time: null,
        isOpen: false
    };

    const weekendDays = ["Saturday", "Sunday"];
    
    weekendDays.forEach(day => {
        const existingHours = weekendHours.find(hours => hours.day === day);
        if (!existingHours) {
            weekendHours.push({ day, ...defaultClosed });
        }
    });
}

// Method to check if weekend opening hours are valid and apply default if necessary
checkWeekendHours(weekendHours) {
    const defaultStartTime = "09:00";  // Default start time
    const defaultEndTime = "22:00";    // Default end time

    weekendHours.forEach(dayHours => {
        // Check if both start_time and end_time are missing
        if (!dayHours.start_time && !dayHours.end_time) {
            dayHours.isOpen = false;   // Set isOpen to false if both times are missing
            dayHours.start_time = null;
            dayHours.end_time = null;
        } else {
            dayHours.isOpen = true;    // Set isOpen to true if at least one time is provided

            // Apply default start_time if it's missing
            if (!dayHours.start_time) {
                dayHours.start_time = defaultStartTime;
            }

            // Apply default end_time if it's missing
            if (!dayHours.end_time) {
                dayHours.end_time = defaultEndTime;
            }
        }
    });
}


    async getAllNearbyRestaurants() {
        return await Restaurant.find().limit(10);
    }

    async getRestaurantByOwnerName(ownerName) {
        return await Restaurant.findOne({ owner: ownerName }); // Assuming owner is stored as ObjectId
    }

    async getRestaurantByTitle(title) {
        return await Restaurant.findOne({ title });
    }

    async get5HighestRatedRestaurant() {
        return await Restaurant.find().sort({ rating: -1 }).limit(5);
    }

    async getMostRatedFood(restaurantId) {
        return await Food.find({ restaurantId })
            .sort({ rating: -1, ratingCount: -1 })
            .limit(1);
    }

    async getTop3MostRatedFood(restaurantId) {
        return await Food.find({ restaurantId })
            .sort({ rating: -1, ratingCount: -1 })
            .limit(3);
    }

    async checkIfOpen(restaurantId) {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant || !restaurant.openingHours) {
            throw new Error("Restaurant or opening hours not found!");
        }

        const currentDay = moment().format('dddd');
        const currentTime = moment().format('HH:mm');

        // Check if it's a weekend or a weekday
        let todayHours = restaurant.openingHours.weekday.find(hours => hours.day === currentDay);
        
        // If not found in weekday, check in weekend
        if (!todayHours) {
            todayHours = restaurant.openingHours.weekend.find(hours => hours.day === currentDay);
        }

        // If no hours found for today or the restaurant is closed
        if (!todayHours || !todayHours.isOpen) {
            return false;
        }

        return currentTime >= todayHours.start_time && currentTime <= todayHours.end_time;
    }
}

export default new RestaurantService();
