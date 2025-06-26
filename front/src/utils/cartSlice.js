import { createSlice } from "@reduxjs/toolkit";

const cartSclice=createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem:(state, action)=>{
        
        state.items.push(action.payload);
    },
    removeItem:(state, action)=>{
      console.log("Removing item with ID:", action.payload);
      
        const index = state.items.findIndex(item => item.info.id === action.payload);
        if (index !== -1) {
            state.items.splice(index, 1);
        } else {
            console.warn(`Item with ID ${action.payload} not found in cart.`);
        }

    },
    clearCart:(state)=>{
        state.items=[];
    }
  
  },
});

 export const { addItem, removeItem, clearCart } = cartSclice.actions;
 export default cartSclice.reducer;