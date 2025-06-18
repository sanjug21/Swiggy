import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RestaurantDetails() {
    const {id}=useParams();
    const [restaurantDetails, setRestaurantDetails] = React.useState(null);
    const API=`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${id}&submitAction=ENTER`;

    useEffect(() => {
        const calling=async () => {
            const response =await axios.get(API);
            console.log(response);
            
            // console.log(response.data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[4].card.card.itemCards);
            setRestaurantDetails(response.data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[4].card.card.itemCards);
            
            
        }
        calling();
    }, [id]);

  return (
    <div>
    <h1 className='text-center font-2xl font-bold'>List of items available for RESTAURANT :{id}</h1>
    {
        restaurantDetails && restaurantDetails.map((foodItem)=>{
            return (
                <div key={foodItem.card.info.id} className="flex w-3/4 mx-auto mb-10 border-b-4 p-4">
                    <div className="flex flex-col w-3/4">
                            <h1>{foodItem.card.info.name}</h1>
                            <h1>{foodItem.card.info.defaultPrice / 100}</h1>
                            <h1>{foodItem.card.info.category}</h1>
                        </div>
                        <img
                        className="w-52 h-44 rounded-md border shadow-lg border-gray-100"
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${foodItem.card.info.imageId}`}
                        alt="" />

                        <button className="border bg-green-300 h-8 relative top-16 right-5">
                        Add +
                        </button>
                    </div>
                    );
                    })}
                </div>
  )
}

export default RestaurantDetails