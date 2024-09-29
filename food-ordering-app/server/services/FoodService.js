import Address from "../models/Address.js";
import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";  // Ensure the Restaurant model is imported

class FoodService {
    // Add food entry
    async addFood(data) {
        const food = new Food(data);
        return await food.save();
    }

    // Add tag to food
    async addTag(foodId, tag) {
        return await Food.findByIdAndUpdate(foodId, { $addToSet: { tags: tag } }, { new: true });
    }

    // Add food type to food
    async addFoodType(foodId, foodType) {
        return await Food.findByIdAndUpdate(foodId, { $addToSet: { foodType: foodType } }, { new: true });
    }

    // Get specific food by ID
    async getFood(id) {
        return await Food.findById(id);
    }

    // Get food recommendations based on user's location
    async getFoodRecommendationsByLocation(location) {
        const { latitude, longitude } = location;

        // Step 1: Find nearby restaurant addresses using geospatial query on Address
        const nearbyAddresses = await Address.find({
            ownerModel: 'Restaurant',  // Only look for Restaurant addresses
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 5000  // 5 kilometers radius
                }
            }
        });

        // Handle no nearby restaurants found
        if (!nearbyAddresses.length) {
            throw new Error('No nearby restaurants found!');
        }

        // Step 2: Get restaurant IDs from the nearby addresses
        const restaurantIds = nearbyAddresses.map(address => address.ownerId);

        // Step 3: Fetch restaurants and populate their foods
        const nearbyRestaurants = await Restaurant.find({
            _id: { $in: restaurantIds }
        }).populate('foods');

        // Handle no restaurants found
        if (!nearbyRestaurants.length) {
            throw new Error('No nearby restaurants found!');
        }

        // Step 4: Gather all available foods from nearby restaurants
        let foodRecommendations = [];
        nearbyRestaurants.forEach((restaurant) => {
            const availableFoods = restaurant.foods.filter((food) => food.isAvailable);  // Fix typo: it should be "foods"
            foodRecommendations = foodRecommendations.concat(availableFoods);
        });

        // Step 5: Sort food recommendations by rating (highest first)
        foodRecommendations = foodRecommendations.sort((a, b) => b.rating - a.rating);

        return foodRecommendations;
    }

    async getTopRatedFoods(req,res){
        return Food().find().sort({rating:-1}).limit(10)
    }
    async deleteFood(id){
         await Food.findByIdAndDelete(id);
    }
    async bestFoods(){
        return await Food.find().sort({rating:-1}).limit(10);
    }
    async getRandomFoodByCodeAndCategory(category){
     return await Food.findOne({category})
    }
    async updateFoodById(id,data){
        return await Food.findByIdAndUpdate(id,data,{new:true})
    }
    async toggleFoodAvailability(id){
        const food = await Food.findById(id);
        food.avaiable = !food.avaiable;
        return await food.save();
    }

}

export default new FoodService();
