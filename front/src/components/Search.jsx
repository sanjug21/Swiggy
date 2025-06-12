import React from 'react'

function Search({restArray,setActiveRating, setRestaurantData}) {

    const searchData = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      const filteredData = restArray.filter((restaurant) =>
        restaurant.info.name.toLowerCase().includes(searchTerm)
      );
      setRestaurantData(filteredData);
      setActiveRating(null); 
    } else {

      setRestaurantData(restArray);
    }
  }
  return (
     <input
          className="border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Search restaurants..."
          onChange={searchData}
        />
  )
}

export default Search