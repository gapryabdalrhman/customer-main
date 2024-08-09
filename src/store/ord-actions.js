import { ordActions } from "./ord";

export const getAllOrders = (id) => {
    return async (dispatch) => {
      const getAll = async () => {
        const data = await fetch(`http://127.0.0.1:8000/customer/view_orders_history/${id}`);
        const response = await data.json();
       
        return response.orders;
      };
      try {
        dispatch(ordActions.setWaitingTrue());
        const data = await getAll();
        dispatch(ordActions.setWaitingFalse());
        dispatch(ordActions.getMenusFromDb(data));
        dispatch(ordActions.clearOrdError());
      } catch (err) {
        console.log(err);
        dispatch(ordActions.setErrorInGetOrd(err));
        dispatch(ordActions.setWaitingFalse());
      }
    };
  };