import axios from 'axios';
import React, { useEffect, useState } from 'react'; // Added useState
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { addItem } from '../utils/cartSlice';

const SWIGGY_IMAGE_BASE_URL = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/';

function RestaurantDetails() {
    const { id } = useParams();
    
    const [menuItems, setMenuItems] = useState([]);
    const [restaurantName, setRestaurantName] = useState('');

    const API = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${id}&submitAction=ENTER`;

    useEffect(() => {
        const calling = async () => {
            try {
                const response = await axios.get(API);
                console.log(response);

                const fetchedRestaurantName = response.data?.data?.cards[0]?.card?.card?.info?.name || `Restaurant ${id}`;
                setRestaurantName(fetchedRestaurantName);

                const regularMenuCards = response.data?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
                if (regularMenuCards) {
                    const itemsCard = regularMenuCards.find(
                        (card) =>
                            card.card?.card?.['@type'] ===
                            'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
                    );
                    if (itemsCard && itemsCard.card.card.itemCards) {
                        setMenuItems(itemsCard.card.card.itemCards);
                    }
                }

            } catch (error) {
                console.error("Failed to fetch restaurant details:", error);
                
            }
        }
        calling();
    }, [id]); 



    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        dispatch(addItem(item));
    }

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            <header className="text-center my-8 md:my-12">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    {restaurantName || `Restaurant ${id}`} Menu
                </h1>
                <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
                    Explore a delightful array of dishes from <span className="font-semibold text-orange-600">{restaurantName || `Restaurant ${id}`}</span>, crafted to satisfy every craving!
                </p>
            </header>

            {menuItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {menuItems.map((foodItem) => {
                        return (
                            <div
                                key={foodItem.card.info.id}
                                className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-[1.03] hover:shadow-2xl border border-gray-100"
                            >
                                <div className="relative w-full h-48 sm:h-56">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={`${SWIGGY_IMAGE_BASE_URL}${foodItem.card.info.imageId}`}
                                        alt={foodItem.card.info.name}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x300?text=Delicious+Food'; }}
                                    />
                                    
                                    {foodItem.card.info.ribbon && foodItem.card.info.ribbon.text && (
                                        <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            {foodItem.card.info.ribbon.text}
                                        </span>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold mb-2 text-gray-900 leading-snug">
                                        {foodItem.card.info.name}
                                    </h3>
                                    {foodItem.card.info.price || foodItem.card.info.defaultPrice ? (
                                        <p className="text-lg font-semibold text-green-700 mb-2">
                                            ₹{(foodItem.card.info.defaultPrice || foodItem.card.info.price) / 100}
                                        </p>
                                    ) : (
                                        <p className="text-md text-gray-500 mb-2">Price not available</p>
                                    )}

                                    {foodItem.card.info.category && (
                                        <p className="text-sm text-gray-600 mb-3">
                                            <span className="font-medium">Category:</span> {foodItem.card.info.category}
                                        </p>
                                    )}

                                    {foodItem.card.info.description && (
                                        <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                                            {foodItem.card.info.description}
                                        </p>
                                    )}

                                    <div className="mt-auto">
                                        <button onClick={()=>addItemToCart(foodItem.card)} className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-75 animate-bounce-once">
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center mt-12 p-8 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg max-w-2xl mx-auto shadow-md">
                    <p className="text-2xl font-semibold mb-4">No Menu Items Available</p>
                    <p className="text-lg">
                        We're sorry, but it looks like there are no specific menu items listed for{' '}
                        <span className="font-bold text-blue-800">{restaurantName || `Restaurant ${id}`}</span> at this moment.
                    </p>
                    <p className="text-md mt-4">Please check back later, or explore other restaurants!</p>
                </div>
            )}
        </div>
    );
}

export default RestaurantDetails;


// import axios from 'axios';

// import React, { useEffect } from 'react'

// import { useParams } from 'react-router-dom'



// function RestaurantDetails() {

//     const {id}=useParams();

//     const [restaurantDetails, setRestaurantDetails] = React.useState(null);

//     const API=`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${id}&submitAction=ENTER`;



//     useEffect(() => {

//         const calling=async () => {

//             const response =await axios.get(API);

//             console.log(response);

//            

//             // console.log(response.data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[4].card.card.itemCards);

//             setRestaurantDetails(response.data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards[4].card.card.itemCards);

//            

//            

//         }

//         calling();

//     }, [id]);



//   return (

//     <div>

//     <h1 className='text-center font-2xl font-bold'>List of items available for RESTAURANT :{id}</h1>

//     {

//         restaurantDetails && restaurantDetails.map((foodItem)=>{

//             return (

//                 <div key={foodItem.card.info.id} className="flex w-3/4 mx-auto mb-10 border-b-4 p-4">

//                     <div className="flex flex-col w-3/4">

//                             <h1>{foodItem.card.info.name}</h1>

//                             <h1>{foodItem.card.info.defaultPrice / 100}</h1>

//                             <h1>{foodItem.card.info.category}</h1>

//                         </div>

//                         <img

//                         className="w-52 h-44 rounded-md border shadow-lg border-gray-100"

//                         src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${foodItem.card.info.imageId}`}

//                         alt="" />



//                         <button className="border bg-green-300 h-8 relative top-16 right-5">

//                         Add +

//                         </button>

//                     </div>

//                     );

//                     })}

//                 </div>

//   )

// }



// export default RestaurantDetails