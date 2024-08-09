import { createSlice } from "@reduxjs/toolkit";

const authSlice  = createSlice({
    name : 'auth' , 
    initialState : {
        userId : localStorage.getItem('userId') || '',
        isLoggedIn : !!localStorage.getItem('userId') ,
        isWaitingForLogin : false , 
        errorInLogin : ''
    } , 
    reducers : {
        userLogin(state,action){
            state.isLoggedIn = true
            localStorage.setItem('userId' ,  action.payload ) , 
            state.isWaitingForLogin = false 
            state.errorInLogin = ''
            state.userId = action.payload
        } , 
        userLogout(state){
            state.isLoggedIn = false
            localStorage.removeItem('userId')
        } , 
        setWating(state , action){
            state.isWaitingForLogin = action.payload
        } ,
        setErrorInLogin(state,action){
            state.errorInLogin = action.payload
        }
    }
})
export const authActions = authSlice.actions
export default authSlice