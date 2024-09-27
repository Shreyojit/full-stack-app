import express from 'express'
import RestaurantController from '../controllers/RestaurantController.js';

const router = express.Router();

router.get('/getnearbyRestaurant',RestaurantController.getNearBy);
router.post('/createRestaurant', RestaurantController.createRestaurant);
router.get('/getallnearbyrestaurants', RestaurantController.getAllNearbyRestaurants);
router.get('/getrestaurantbyownername/:ownerName', RestaurantController.getRestaurantByOwnerName);
router.get('/getRestaurantByTitle',RestaurantController.getRestaurantByTitle)
router.get('/gethighestratedrestaurant', RestaurantController.getHighestRatedRestaurant);
router.get('/getmostratedfood/:restaurantId', RestaurantController.getMostRatedFood);
router.get('/gettop3mostratedfood/:restaurantId', RestaurantController.getTop3MostRatedFood);
router.get('/checkifopen/:restaurantId', RestaurantController.checkIfOpen);

export default router;