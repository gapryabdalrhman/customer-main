import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MainPageText from '../../component/MainPageText/MainPageText';
import ErrorGettingData from '../../component/ErrorGetingData/ErrorGettingData';
import SkeltonLoader from '../../component/SkeltonLoader/SkeltonLoader';
import { Container } from 'react-bootstrap';
import TableView from "../../component/TableView/TableView";
import { getAllOrders } from '../../store/ord-actions';

const Orders = () => {

    const allOrders = useSelector((state) => state.ord.allOrders);
    let some = [...allOrders]
    var bb = Object.assign([], some)
    some.reverse()
    
    const dispatch = useDispatch()
    const isWaitingForGetCustomers = useSelector(
      (state) => state.ord.isWaitingForGetOrders
    );

    const  isRequireRender = useSelector(
        (state) => state.ord.isRequireRender
      );
    
    const errorInGetCustomers = useSelector(
      (state) => state.ord.errorInGetOrders
    );

    const id = useSelector(
        (state) => state.auth.userId
      );
   useEffect(()=>{
    dispatch(getAllOrders(id))
   } ,[isRequireRender])
  return (
    <Container fluid>
      <MainPageText text="Orders" />
      <Container className="container my-5 pb-4 bg-white rounded-2 shadow-sm">
        {isWaitingForGetCustomers ? (
          <SkeltonLoader />
        ) : errorInGetCustomers ? (
          <ErrorGettingData />
        ) : (
            allOrders &&  allOrders.length > 0 &&
          <>
          <MainPageText text="Orders List" />
         <TableView  columns={Object.keys(allOrders[0])} data={some} />
         </>
        )}
      </Container>
    </Container>
  )
}

export default Orders