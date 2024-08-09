import React from 'react'
import MainPageText from '../../component/MainPageText/MainPageText'
import AddOrderForm from '../../component/AddOrderForm/AddOrderForm'

const OutOrderPage = () => {
  return (
    <div className='container-fluid'>
        <MainPageText text='Out Source Order'/>
        <AddOrderForm />
    </div>
  )
}

export default OutOrderPage