import React from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import CustomInput from "../CustomInput/CustomInput";

import {  faEnvelope, faPhone , faMapLocation , faBusinessTime , faList} from "@fortawesome/free-solid-svg-icons";
import MainPageText from "../MainPageText/MainPageText";

import {useDispatch , useSelector} from 'react-redux'
import {Container} from 'react-bootstrap'


import ErrorGettingData from "../ErrorGetingData/ErrorGettingData";
import SkeltonLoader from "../SkeltonLoader/SkeltonLoader";
import OverLoader from "../OverLoader/OverLoader";
import { calculateCost, outOrder } from "../../store/cart-actions";
import {  useNavigate } from "react-router-dom";

const AddOrderForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isWaitingForGetBusiness = useSelector(
        (state) => state.cart.isWaitingForGetCart
      );
      const id = useSelector(
        (state) => state.auth.userId
      );
      const isErrorGetBuisness = useSelector(
        (state) => state.cart.errorInGetOrders
      );
     
  return (
    <Container fluid>
    <Container className="container my-5 pb-4 bg-white rounded-2 shadow-sm" style={{position : 'relative'}}>
      {isWaitingForGetBusiness ? <OverLoader /> : null}
      { isErrorGetBuisness ? (
        <ErrorGettingData />
      ) : (
       
        <>
         <MainPageText text='Fill Order Information'/> 
      <Formik
        initialValues={{
            description: "",
            delivery_address: "",
            pick_address : "" ,
         
        }}
        onSubmit={(values , {resetForm , setFieldError  }) => {
          
           const data = {
            customer_id : id , 
            ...values
           }
          
             dispatch(outOrder(data))
            navigate('/orders' , {replace : true})
        }} 
       
      >
        {({ handleSubmit , values }) => {
          return (
            <Form onSubmit={handleSubmit} noValidate>
              <CustomInput
                name='description' 
                label="Order Description"
                placeholder="Enter Order Description"
                icon={faBusinessTime}
              />
               <CustomInput
                name='delivery_address' 
                label="Delivery Address"
                placeholder="Enter Delivery Address"
                icon={faEnvelope}
              />  
               <CustomInput
                name='pick_address' 
                label="Pick Address"
                placeholder="Enter Pick Address"
                icon={faEnvelope}
              />  
              
              <Button type='submit' className='w-100 p-2 mt-4'>Order Now</Button>
            </Form>
          );
        }}
      </Formik>
       </>
      )}
    </Container>
  </Container>
  )
}

export default AddOrderForm