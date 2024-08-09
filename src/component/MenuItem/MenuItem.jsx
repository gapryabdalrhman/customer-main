import React from 'react'
import style from './rowCategiryItem.module.css'
import { ChevronRightRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
const MenuItem = ({imgSrc , name , item}) => {
    const navigate = useNavigate()
    const navigateHandler = ()=>{
        navigate(`menu/${Object.values(item._id)[0]}`)
    }
  return (
    <div  className={style.itemContainer} onClick={navigateHandler}>
        <div className={style.imgBox}>
           <img src={imgSrc} alt="category-banner" />
        </div>
        <p>{name}</p>
        <i><ChevronRightRounded className={style.svg}/></i> 
    </div>
  )
}

export default MenuItem