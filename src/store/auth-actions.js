import { authActions }  from "./authSlice";
import { toastActions } from "./toastSlice";
export const loginHandler = (information , dispatchPersonalInformation)=>{
    return async (dispatch)=>{
        const login = async ()=>{
            
            const data =  await fetch('http://127.0.0.1:8000/customer/create_new_account' , {
            method : 'POST' , 
            body : JSON.stringify({...information}) 
          })
           const r =  await data.json()
           console.log(r)
           return r.id
        }
           try{
            
            dispatch(authActions.setWating(true))
            const userId =  await login()
            dispatch(authActions.userLogin(userId))
        }
        catch(err){
            dispatch(authActions.setWating(false))
            console.log(err.message)
            dispatchPersonalInformation({type : 'registerValidation' , payload : {error : err.message}})
            dispatch(authActions.setErrorInLogin(err.message))
            
        }
    }
}


export const logHandler = (information , dispatchPersonalInformation)=>{
    return async (dispatch)=>{
        const login = async ()=>{
            
            const data =  await fetch('http://127.0.0.1:8000/customer/login' , {
            method : 'POST' , 
            body : JSON.stringify({...information}) 
          })
           const r =  await data.json()
           console.log(r)
           return r
        }
           try{
            dispatch(authActions.setWating(true))
            const userId =  await login()
            // dispatch(authActions.userLogin(userId))
        }
        catch(err){
            dispatch(authActions.setWating(false))
            console.log(err.message)
            dispatchPersonalInformation({type : 'registerValidation' , payload : {error : err.message}})
            dispatch(authActions.setErrorInLogin(err.message))
            
        }
    }
}

