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

async function deleteRestaurant(req, res) {
    try {
        const { id } = req.params;
        const deletedRestaurant = await RestaurantModel.findByIdAndDelete(id);
        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        return res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateRestaurant(req, res){
    try {
        const { id } = req.params;
        const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        return res.status(200).json(updatedRestaurant);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export { createRestaurant, getAllRestaurants, deleteRestaurant,updateRestaurant };
