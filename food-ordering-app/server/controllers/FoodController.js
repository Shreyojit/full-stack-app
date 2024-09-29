import FoodService from "../services/FoodService.js";


class FoodController{
    async addFood(req,res,next){
        try{
           const foodData = req.body;
           const newFood = await FoodService.addFood(foodData);
           return res.status(201).json(newFood) 
        } catch(err){
            next(err)
        }
    }
    async addTag(req,res,next){
        try{
          const {foodId} = req.params;
          const {tag} = req.body;
          const updatedFood = await FoodService.addTag(foodId,tag);
          return res.status(200).json(updatedFood)
        } catch(err){
            next(err)
        }
    }
    async addFoodType(req,res,next){
        try{
          const {foodId} = req.params;
          const {foodType} = req.body;
          const updatedFood = await FoodService.updateFoodById(foodId,foodType);
          return res.status(200).json(updatedFood)
        }catch{
            next(err)
        }
    }
    async getFood(req,res,next){
        try{
         const {id} = req.params;
         const food = await FoodService.getFood(id);
         return res.status(200).json(food);
        }catch(err){
            next(err)
        }
    }
    async getFoodRecommendationByLocation(req,res,next){
        try{
            const location = req.body;
            const recommendations = await FoodService.getFoodRecommendations(location);
            return res.status(200).json(recommendations)

        } catch(err){
            next(err)
        }
    }
    async getTopRatedFoods(req,res,next){
        try{
         const topFoods=await FoodService.getTopRatedFoods();
         return res.status(200).json(topFoods)

        }catch(err){
            next(err);
        }
    }
    
     // Delete food by ID
     async deleteFood(req, res) {
        try {
            const { id } = req.params;
            await FoodService.deleteFood(id);
            return res.status(200).json({ message: 'Food deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Get best foods
    async getBestFoods(req, res) {
        try {
            const bestFoods = await FoodService.bestFoods();
            return res.status(200).json(bestFoods);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Get random food by category
    async getRandomFoodByCategory(req, res) {
        try {
            const { category } = req.params;
            const food = await FoodService.getRandomFoodByCodeAndCategory(category);
            return res.status(200).json(food);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Update food by ID
    async updateFood(req, res) {
        try {
            const { id } = req.params;
            const foodData = req.body;
            const updatedFood = await FoodService.updateFoodById(id, foodData);
            return res.status(200).json(updatedFood);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // Toggle food availability
    async toggleFoodAvailability(req, res) {
        try {
            const { id } = req.params;
            const updatedFood = await FoodService.toggleFoodAvailability(id);
            return res.status(200).json(updatedFood);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}

export default new FoodController();