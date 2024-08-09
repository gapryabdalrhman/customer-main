import { createSlice } from "@reduxjs/toolkit";

const menusSlice = createSlice({
  name: "menus",
  initialState: {
    allMenus: [],

    isWaitingForGetMenus: true,

    errorInGetMenus: null,
    isRequireRender: false,
  },
  reducers: {
    getMenusFromDb(state, action) {
      state.allMenus = action.payload;
      state.isWaitingForGetMenus = false;
      state.errorInGetMenus = null;
    },

    setWaitingTrue(state) {
      state.isWaitingForGetMenus = true;
    },
    setWaitingFalse(state) {
      state.isWaitingForGetMenus = false;
    },
    setErrorInGetMenus(state, action) {
      state.errorInGetDrivers = action.payload;
    },

    clearMenusError(state) {
      state.errorInGetDrivers = null;
    },
    setRequieRender(state) {
      state.isRequireRender = !state.isRequireRender;
    },
  },
});
export const menusActions = menusSlice.actions;
export default menusSlice;
