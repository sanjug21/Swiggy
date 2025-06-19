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
       
        const index = state.items.findIndex(item => item.id === action.payload.itemId);
        itemToRemove = state.items[index];
    },
    clearCart:(state)=>{
        state.items=[];
    }
  
  },
});

 export const { addItem, removeItem, clearCart } = cartSclice.actions;
 export default cartSclice.reducer;