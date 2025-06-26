import RestaurantModel from '../models/Restaurant.model.js';

async function createRestaurant(req, res) {
    try {
        const newRestaurant = await RestaurantModel.create(req.body);
        return res.status(201).json(newRestaurant);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAllRestaurants(req, res) {
    try {
        const restaurants = await RestaurantModel.find({});
        return res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error fetching all restaurants:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export { createRestaurant, getAllRestaurants };
