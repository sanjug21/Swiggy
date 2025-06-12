import axios from 'axios';
import React, { useEffect, useState } from 'react';

function APIcalling() {
    const[restaurantsData,setRestaurantsData]=useState([]);
    // const API="https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=21.99740&lng=79.00110&carousel=true&third_party_vendor=1"
    // const API = "https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=27.87960&lng=78.07620&carousel=true&third_party_vendor=1" 
    const API="https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.49870&lng=77.66690&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING" 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API);
                 console.log(response.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
                
                setRestaurantsData(response.data.data.cards[1]?.card?.card?.gridElements.infoWithStyle.restaurants);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
  return restaurantsData;

}
export default APIcalling;