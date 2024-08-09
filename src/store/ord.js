import { createSlice } from "@reduxjs/toolkit";

const ord = createSlice({
  name: "ord",
  initialState: {
    allOrders: [],
    isWaitingForGetOrders: false,
    errorInGetOrders: null,
    isRequireRender : true ,
    selectedOutOrder : {} , 

  },
  reducers: {
    getMenusFromDb(state, action) {
      state.allOrders = action.payload;
      state.isWaitingForGetOrders = false;
      state.errorInGetOrders = null;
    },
   getSingleOrderFromDb(state, action) {
      state.selectedOutOrder = action.payload;
      state.isWaitingForGetOrders = false;
      state.errorInGetOrders = null;
      
    },
   requireRender(state){
    state.isRequireRender = !state.isRequireRender
   },
    setWaitingTrue(state) {
      state.isWaitingForGetOrders = true;
    },
    setWaitingFalse(state) {
      state.isWaitingForGetOrders = false;
    },
    setErrorInGetOrd(state, action) {
      state.errorInGetOrders = action.payload;
    },
   
    clearOrdError(state) {
      state.errorInGetOrders = null;
    },
   
   
  },
});
export const ordActions = ord.actions;
export default ord;
