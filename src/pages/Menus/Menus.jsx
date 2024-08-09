import React, { useState } from "react";
import { Button, Container, Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainPageText from "../../component/MainPageText/MainPageText";
import SkeltonLoader from "../../component/SkeltonLoader/SkeltonLoader";
import ErrorGettingData from "../../component/ErrorGetingData/ErrorGettingData";
import MenuItem from "../../component/MenuItem/MenuItem";
import MarketPng from "../../assets/images/market.png";
import FoodPng from "../../assets/images/food.png";
import { Link } from "react-router-dom";
const Menus = () => {
  const [showMenu, setShowMenu] = useState(true);
  const allMenus = useSelector((state) => state.menu.allMenus);
  const isWaitingForGetMenus = useSelector(
    (state) => state.menu.isWaitingForGetMenus
  );
  console.log(isWaitingForGetMenus);
  const errorInGetMenus = useSelector((state) => state.menu.errorInGetMenus);
  return (
    <Container fluid>
      <MainPageText text="MENUS" />
      <Container fluid className="d-flex justify-content-around">
        <Link to="outorder">
          <Button>Order From Out Source palace</Button>
        </Link>
        <Button
          onClick={() => {
            setShowMenu((sate) => !sate);
          }}
        >
          SHOW MENUS
        </Button>
      </Container>

      <Container className="container my-5 p-4 bg-white rounded-2 shadow-sm d-flex justify-content-center flex-wrap gap-5">
        {isWaitingForGetMenus ? (
          <>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </>
        ) : errorInGetMenus ? (
          <ErrorGettingData />
        ) : (
          allMenus.length > 0 &&
          allMenus.map((e, index) => {
            return (
              <MenuItem key={index} item={e} name={e.name} imgSrc={FoodPng} />
            );
          })
        )}
      </Container>
    </Container>
  );
};

export default Menus;
