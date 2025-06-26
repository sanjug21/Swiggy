import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../utils/cartSlice';

const SWIGGY_IMAGE_BASE_URL = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/';


function Cart() {
  const items = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    
    
    dispatch(removeItem(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-160px)]">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">Your Cart</h1>

      {items.length > 0 ? (
        <>
          <div className="flex justify-end mb-6">
            <button
              onClick={handleClearCart}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((foodItem) => (
              <div
                key={foodItem.info.id}
                className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
              >
                <img
                  src={`${SWIGGY_IMAGE_BASE_URL}${foodItem.info.imageId}`}
                  alt={foodItem.info.name}
                  className="w-full md:w-32 h-32 object-cover"
                />
                <div className="p-4 flex-grow text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{foodItem.info.name}</h3>
                  <p className="text-gray-600 mb-2">
                    ₹{foodItem.info.price ? foodItem.info.price / 100 : foodItem.info.defaultPrice / 100}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(foodItem.info.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-sm hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          <p className="text-3xl font-semibold mb-4">Your cart is empty!</p>
          <p className="text-lg mb-8">Add some delicious items to get started.</p>
          <a href="/" className="px-8 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200">
            Go to Menu
          </a>
        </div>
      )}
    </div>
  );
}

export default Cart;