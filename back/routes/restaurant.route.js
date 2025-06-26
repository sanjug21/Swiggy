import express from 'express';
const router = express.Router();
import { createRestaurant , getAllRestaurants,deleteRestaurant ,updateRestaurant } from '../controllers/restaurant.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

router.get('/',verifyToken, getAllRestaurants); 
router.post('/',verifyToken, createRestaurant);
router.delete('/:id',verifyToken,deleteRestaurant);
router.put('/:id',verifyToken, updateRestaurant); 

export default router;