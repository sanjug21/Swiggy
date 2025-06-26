import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name:String,
    deliveryTime:String,
    cusines:String,
    rating:String  ,
    image:String,
    address:String,
    
    }, {
    timestamps: true, 
});

const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

export default RestaurantModel;