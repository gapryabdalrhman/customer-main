import React, { useEffect } from "react";
import style from "./rightMenu.module.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkMenuActions } from "../../store/checkMenuSlice";
import CartItem from "../CartItem/CartItem";

import SkeltonLoader from "../SkeltonLoader/SkeltonLoader";
import ErrorGettingData from "../ErrorGetingData/ErrorGettingData";
import { checkOut } from "../../store/cart-actions";
const RightMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // closing menu will sit to close true for 300ms in rowCategories then it will be false (for display animation when closing it)
  const closingMenu = useSelector((state) => state.checkMenu.closingMenu);
  // select all items in cart to display it
  const cartItems = useSelector((state) => state.cart.cart);
  const isWaitingForGetCart = useSelector(
    (state) => state.cart.isWaitingForGetCart
  );
  const isCheckedMenuOpen = useSelector(
    (state) => state.checkMenu.isCheckMenuClicked
  );
  const errorInGetCart = useSelector((state) => state.cart.errorInGetCart);
  const customerId = useSelector((state) => state.auth.userId);
  // caluclate the total price of check
  const totalPrice = cartItems.reduce((a, b) => a + +b.price, 0);
  // use effect to display animation every time item add to it

  useEffect(() => {
    if (!closingMenu) {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(checkMenuActions.setClosingMenu(false));
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [closingMenu]);
  // set Active payment item when click on checkOut

  const openCheckMenuHandler = () => {
    if (isCheckedMenuOpen) {
      dispatch(checkMenuActions.setClosingMenu(true));
      setTimeout(() => {
        dispatch(checkMenuActions.setIsCheckMenuClicked(false));
      }, 250);
    } else {
      dispatch(checkMenuActions.setIsCheckMenuClicked(true));
    }
  };
const navigateHandler = ()=>{
  navigate('/orders' , {replace : true})
  openCheckMenuHandler()
}
  const checkOutHandler = () => {
    dispatch(checkOut(customerId , navigateHandler));
    
  };
  return (
    <>
      <div
        className={
          closingMenu
            ? `${style.rightMenu} ${style.closeMenu}`
            : `${style.rightMenu}`
        }
      >
        {isWaitingForGetCart ? (
          <SkeltonLoader />
        ) : errorInGetCart ? (
          <ErrorGettingData />
        ) : (
          <ul className={style.list}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  item={item}
                  id={item._id}
                  name={item.title}
                  totalPrice={item.price * item.quantity}
                  price={item.price}
                  amount={item.quantity}
                />
              ))
            ) : (
              <p className={style.noResult}>
                No Items Here , Try add some thing{" "}
              </p>
            )}
          </ul>
        )}
        {cartItems.length > 0 && (
          <>
            {isWaitingForGetCart ? (
              <SkeltonLoader />
            ) : (
              <>
                <p>
                  Total Price : <span>{totalPrice} LE</span>{" "}
                </p>
                <button onClick={checkOutHandler} className={style.button}>
                  Check Out
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RightMenu;
