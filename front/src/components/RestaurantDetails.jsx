import React from 'react'
import { useParams } from 'react-router-dom'

function RestaurantDetails() {
    const {id}=useParams();
    const API=`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${id}&submitAction=ENTER`;
    
  return (
    <div>RestaurantDetails{id}</div>
  )
}

export default RestaurantDetails