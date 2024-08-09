import React, { useState , useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  Container,
  InputGroup,
  Image,
  NavDropdown,
  Button,
  Badge,
} from "react-bootstrap";
import DelImg from "../../assets/images/del.png";
import UserImg from "../../assets/images/pic.png";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { Link } from "react-router-dom";
import RightMenu from "../RightMenu/RightMenu";
import { checkMenuActions } from "../../store/checkMenuSlice";
const TopNav = ({ isNotActive, setNotActive }) => {
  
// select closing menu to display animation every time the menu is going to close
const closingMenu = useSelector((state) => state.checkMenu.closingMenu);
//state for mange the check menu that open by cart icon
const isCheckedMenuOpen = useSelector(
  (state) => state.checkMenu.isCheckMenuClicked
);
// this state to display animation every time item added to cart
const [itemIsAdded, setItemIsAdded] = useState(false);

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

  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userId);
  const numOfItemsInCart = useSelector((state) => state.cart.numOfItemsInCart);
  console.log(userEmail);
  var barsIcon = (
    <i className="fas fa-bars fs-2" style={{ color: "rgb(2, 36, 71)" }}></i>
  );
  var crossIcon = <i className="fa-solid fa-xmark fs-2"></i>;

  const logoutHandler = () => {
    dispatch(authActions.userLogout());
  };

  return (
    <>
    {isCheckedMenuOpen ? <RightMenu /> : null}
    
    <Navbar
      className="shadow"
      bg="white"
      expand="lg"
      style={{ position: "fixed", top: "0", width: "100%", zIndex: "10" }}
    >
      <Container fluid className="justify-content-start">
        <button
          type="button"
          onClick={() => setNotActive(!isNotActive)}
          className="btn"
        >
          <span className={isNotActive ? "text-primary" : "hidden"}>
            {barsIcon}
          </span>
          <span className={isNotActive ? "text-primary hidden" : ""}>
            {crossIcon}
          </span>
        </button>
        <Navbar.Brand
          className="d-flex align-items-center justify-content-start mx-2 flex-grow-1"
          style={{ fontWeight: "800" }}
        >
          <img
            alt="logo"
            src={DelImg}
            width="50"
            height="50"
            className="d-inline-block align-top mx-2"
          />{" "}
          FAST <span className="text-primary">X</span>
        </Navbar.Brand>

        <Nav className="d-flex justify-content-center align-content-center gap-3 justify-self-end">
          <Button onClick={openCheckMenuHandler} variant="primary" className='d-flex align-content-center justify-content-center'>
            <i className="fa-solid fa-cart-plus fs-2"></i>
            <Badge bg="secondary" className='m-auto'>{numOfItemsInCart}</Badge>
          </Button>
          <Image
            alt="logo"
            src={UserImg}
            width="50"
            height="50"
            roundedCircle
            className="border border-1 border-primary p-1"
          />
          
          <i onClick={logoutHandler} className="fa-solid fa-right-from-bracket text-muted m-auto fs-4"></i>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
};
export default TopNav;
