import express from 'express';
const router = express.Router();
import { createRestaurant , getAllRestaurants,deleteRestaurant ,updateRestaurant } from '../controllers/restaurant.controller.js';

router.get('/', getAllRestaurants); 
router.post('/', createRestaurant);
router.delete('/:id',deleteRestaurant);
router.put('/:id', updateRestaurant); 

export default router;