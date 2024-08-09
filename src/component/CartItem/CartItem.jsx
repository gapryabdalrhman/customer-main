import React from 'react'
import styles from './cartItem.module.css'
import AddCircleIcon  from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import {useDispatch , useSelector} from 'react-redux'

const CartItem = (props) => {
 
  // use dispatch to add item to cart and remove also
  const dispatch = useDispatch()
  // add item to cart handler when click on add icon
 
 
  return (
    <li className={styles.list}>
     <div className={styles.main}>
      <p>{props.name}</p>
     </div>   
    <div className={styles.actions}>
        <p>{props.price} x {props.amount}</p>
        <div className={styles.circle}>
            {/* <RemoveCircleIcon onClick={()=>removeClickHandler(props.id)}/> */}
            <p>{props.amount}</p>
            {/* <AddCircleIcon onClick={()=> addClickHandler()}/> */}
        </div>
        <p>{props.totalPrice} LE</p>
    </div>
</li>
  )
}

export default CartItem