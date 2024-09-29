import express from 'express';
import FoodController from '../controllers/FoodController.js';


const router = express.Router();

router.post('/food', FoodController.addFood);
router.put('/food/:foodId/tag', FoodController.addTag);
router.put('/food/:foodId/foodType', FoodController.addFoodType);
router.get('/food/:id', FoodController.getFood);
router.post('/food/recommendations', FoodController.getFoodRecommendationByLocation);
router.get('/food/top-rated', FoodController.getTopRatedFoods);
router.delete('/food/:id', FoodController.deleteFood);
router.get('/food/best', FoodController.getBestFoods);
router.get('/food/random/:category', FoodController.getRandomFoodByCategory);
router.put('/food/:id', FoodController.updateFood);
router.put('/food/:id/availability', FoodController.toggleFoodAvailability);

export default router;
