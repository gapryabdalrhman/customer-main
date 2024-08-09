import React from 'react'
import './loginStyle.css'

import Login from '../../component/Login/Login'
import { useSelector } from 'react-redux'
import Log from '../../component/Log/Log'
import { Navigate } from 'react-router-dom'

const LoginPage = () => {
   const isUserLoggedIn = useSelector((state)=> state.auth.isLoggedIn)  
   if(isUserLoggedIn)  return <Navigate to='/' replace/>
  return (
    <div className="main">
    <Log />
    <div className="links">
        
    </div>
</div>
  )
}

export default LoginPage