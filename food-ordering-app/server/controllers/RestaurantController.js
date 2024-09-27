import RestaurantService from "../services/RestaurantService.js";

class RestaurantController {
    async getNearBy(req, res, next) {
        try {
            const { latitude, longitude } = req.query;
            const nearByRestaurants = await RestaurantService.findNearbyRestaurants(latitude, longitude);
            res.status(200).json(nearByRestaurants);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async createRestaurant(req, res, next) {
        try {
            const newRestaurant = await RestaurantService.createRestaurant(req.body);
            res.status(201).json(newRestaurant);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async getAllNearbyRestaurants(req, res, next) {
        try {
            const restaurants = await RestaurantService.getAllNearbyRestaurants();
            res.status(200).json(restaurants);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async getRestaurantByOwnerName(req, res, next) {
        try {
            const { ownerName } = req.params;
            const restaurant = await RestaurantService.getRestaurantByOwnerName(ownerName);
            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant not found" });
            }
            res.status(200).json(restaurant);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async getMostRatedFood(req, res, next) {
        try {
            const { restaurantId } = req.params;
            const topRatedFood = await RestaurantService.getMostRatedFood(restaurantId);
            if (!topRatedFood || topRatedFood.length === 0) {
                return res.status(404).json({ message: "No food found for this restaurant" });
            }
            res.status(200).json(topRatedFood);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async getTop3MostRatedFood(req, res, next) {
        try {
            const { restaurantId } = req.params;
            const top3RatedFoods = await RestaurantService.getTop3MostRatedFood(restaurantId);
            if (!top3RatedFoods || top3RatedFoods.length === 0) {
                return res.status(404).json({ message: "No food found for this restaurant" });
            }
            res.status(200).json(top3RatedFoods);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async getRestaurantByTitle(req, res, next) {
        try {
            const { restaurantTitle } = req.params;
            const restaurant = await RestaurantService.getRestaurantByTitle(restaurantTitle);
            if (!restaurant) {
                return res.status(404).json({ message: "Restaurant not found" });
            }
            res.status(200).json(restaurant);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async getHighestRatedRestaurant(req, res, next) {
        try {
            const top5HighestRatedRestaurant = await RestaurantService.get5HighestRatedRestaurant();
            res.status(200).json(top5HighestRatedRestaurant);
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }

    async checkIfOpen(req, res, next) {
        try {
            const { restaurantId } = req.params;
            const isOpen = await RestaurantService.checkIfOpen(restaurantId);
            res.status(200).json({ isOpen });
        } catch (error) {
            next(error);  // Pass the error to the next middleware
        }
    }
}

export default new RestaurantController();
