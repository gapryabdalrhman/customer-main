import React from "react";
import style from "./singleDishItem.module.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { AddItemToCart } from "../../store/menu-actions";
import { useNavigate } from "react-router-dom";

const SingleMenuItem = ({ item, name, price, category , description }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  
  
  const addItemToCartHandler = () => {
    dispatch(AddItemToCart(userId , Object.values(item._id)[0]));
    
  };

  return (
   
    <div className={style.mainDishItem}>
      <p>{name}</p>
      <p className="m-auto text-danger text-uppercase">{category}</p>
      <AddCircleIcon onClick={() => addItemToCartHandler()} />
      <p>{price} LE</p>
       <span className="text-danger">DESCRIPTION :</span>
       <p>{description}</p>
    </div>
    
  );
};

export default SingleMenuItem;
