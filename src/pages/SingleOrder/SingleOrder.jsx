import React, { useEffect } from 'react'
import SkeltonLoader from '../../component/SkeltonLoader/SkeltonLoader';
import ErrorGettingData from '../../component/ErrorGetingData/ErrorGettingData';
import MainPageText from '../../component/MainPageText/MainPageText';
import { Container } from 'react-bootstrap';
import DataImg from '../../assets/images/data.png'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../../store/cart-actions';
const SingleOrder = () => {
   const isWaitingForGetOrders = useSelector((state)=>state.cart.isWaitingForGetCart) 
   const errorInGetOrders =  useSelector((state)=>state.cart.errorInGetCart) 
   const selected =  useSelector((state)=>state.ord.selectedOutOrder) 
   console.log(selected)
   const dispatch = useDispatch()

   const id= useSelector((state)=>state.cart.orderId) 
   console.log(id)
   useEffect(()=>{
    if(!id || id === "") return 
    dispatch(getSingleOrder(id)) 
   } ,[id])
  return (
    <Container fluid >
    <MainPageText text="Order" />
    <Container className="container my-5 pb-4 bg-white rounded-2 shadow-sm">
      <MainPageText text="Order Information" />
      {isWaitingForGetOrders ? (
        <SkeltonLoader />
      ) : errorInGetOrders ? (
        <ErrorGettingData />
      ) : (
       
        <div className="row justify-content-center bg-white rounded p-3" >
        <div className="col-md-4" >
            <img  src={DataImg} alt="" className="w-100" />
        </div>
        <div className="col-md-7" style={{maxHeight : '400px' , overflow : 'auto'}}>
           {/* <DetailItem title='Total Cost' txt={`${selectedOrder.total_cost} LE `}/>
           <DetailItem title='Status' txt={`${selectedOrder.status}  `}/>
           <DetailItem title='Rating' txt={`${selectedOrder.rating}  `}/>
           <DetailItem title='Date' txt={`${selectedOrder.date}  `}/>
           <DetailItem title='Feedback' txt={`${selectedOrder.feedback}  `}/>
           <DetailItem title='Delivery Address' txt={`${selectedOrder.delivery_address}  `}/>
           <DetailItem title='Pickup Address' txt={`${selectedOrder.pickup_address}  `}/> */}
           
        </div>
        </div>
        
      )}
    </Container>
  </Container>
  )
}

export default SingleOrder