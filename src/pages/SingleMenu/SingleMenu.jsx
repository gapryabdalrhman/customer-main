import React from "react";
import { useParams } from "react-router-dom";
import {Container} from 'react-bootstrap'
import MainPageText from '../../component/MainPageText/MainPageText'
import SingleMenuItem from "../../component/SingleMenuItem/SingleMenuItem";
import { useSelector } from "react-redux";
const SingleMenu = () => {
  const { id } = useParams();
  const allMenus = useSelector((state) => state.menu.allMenus);
  
  const menuItems = allMenus.length > 0 && allMenus.filter((item)=> Object.values(item._id)[0] === id).map(({items , ...e})=>{
        return items
  })

 
  return  <Container fluid>
  <MainPageText text="MENU ITEMS" />
  <Container  className="container my-5 p-4 bg-white rounded-2 shadow-sm d-flex justify-content-center flex-wrap gap-5">
    {/* {isWaitingForGetMenus ? (
      <SkeltonLoader />
    ) : isErrorGetBuisness ? (
      <ErrorGettingData />
    ) : ( */}
     
      <>
      {menuItems[0].map((e , index)=>{
        return (
           <SingleMenuItem key={index} item={e} className='m-auto' description={e.description} name={e.title} category={e.category} price={e.price}/>
        )
      })}
      
     </>
  
  </Container>
</Container>
};

export default SingleMenu;
