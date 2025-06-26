import express from 'express';
const router = express.Router();
import { createRestaurant , getAllRestaurants  } from '../controllers/restaurant.controller.js';

router.get('/', getAllRestaurants); 
router.post('/', createRestaurant);

export default router;