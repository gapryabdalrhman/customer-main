import {configureStore} from '@reduxjs/toolkit' 
import buisnessSlice from './buisnessSlice'
import customerSlice from './customerSlice'
import ordersSlice from './orderSlice'
import driverSlice from './driveSlice'
import pendingBuisnessSlice from './pendingBuisnessSlice'
import pendingDriversSlice from './pendingDriversSlice'
import toastSlice from './toastSlice'
import authSlice from './authSlice'
import checkMenuSlice from './checkMenuSlice'
import menusSlice from './menusSlice'
import cartSlice from './cartSlice'
import ord from './ord'
const store = configureStore({
    reducer : {
    
        order : ordersSlice.reducer  ,
        ord : ord.reducer ,
        pendingBuisness : pendingBuisnessSlice.reducer , 
        toast : toastSlice.reducer ,
        auth : authSlice.reducer , 
        checkMenu : checkMenuSlice.reducer,
        menu : menusSlice.reducer , 
        cart : cartSlice.reducer
    }
})

export default store