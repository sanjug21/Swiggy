import { useEffect, useState } from "react";
import APIcalling from "./APIcalling";
import RestaurantCard from "./RestaurantCard";
import Search from "./Search";

function Body() {
  const restArray = APIcalling();

  const [restaurantData, setRestaurantData] = useState([]);
  const [activeRating, setActiveRating] = useState(null);

  useEffect(() => {
    if (restArray && restArray.length > 0) {
      setRestaurantData(restArray);
    }
  }, [restArray]);

  const ChangeRating = (rating) => {
    if (restArray) {
      const filteredData = restArray.filter(
        (restaurant) => restaurant.info.avgRating >= rating
      );
      setRestaurantData(filteredData);
      setActiveRating(rating);
    }
  };

  const resetFilter = () => {
    if (restArray) {
      setRestaurantData(restArray);
      setActiveRating(null);
    }
  };

  const getButtonClass = (rating) => {
    const baseClasses = "border rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105";
    const activeClasses = "bg-green-600 text-white shadow-md"; 
    return `${baseClasses} ${activeRating === rating ? activeClasses : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`;
  };

 

  return (
    <div className="p-5">
      <h1 className="font-bold text-2xl mb-4">
        Restaurants with online food delivery in Mathura
      </h1>
      <div className="flex flex-wrap gap-3 mb-6"> 
        <button
          className={getButtonClass(4.5)}
          onClick={() => ChangeRating(4.5)}
        >
          ⭐ 4.5+ Rating
        </button>

        <button
          className={getButtonClass(4)}
          onClick={() => ChangeRating(4)}
        >
          ⭐ 4.0+ Rating
        </button>

        <button
          className={getButtonClass(3)}
          onClick={() => ChangeRating(3)}
        >
          ⭐ 3.0+ Rating
        </button>

        <button
          className={`border rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out hover:scale-105 ${activeRating === null ? "bg-red-500 text-white shadow-md" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
          onClick={resetFilter}
        >
          Clear All Filters
        </button>
       <Search restArray={restArray} setActiveRating={setActiveRating} setRestaurantData={setRestaurantData}/>
      </div>
      
        <RestaurantCard restArray={restaurantData} />
      
    </div>
  );
}

export default Body;