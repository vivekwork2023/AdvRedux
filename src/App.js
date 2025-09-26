import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, getCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);


  useEffect (() => {
    dispatch(getCartData());
  }, [dispatch]);

  useEffect( () => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if ( cart.isChanged ) {
      dispatch(sendCartData(cart));
    }
     // we are dispatching the function that we created in the cart-slice.js file. This is a thunk function. This function will be called by the redux-thunk middleware. The redux-thunk middleware will call this function with the dispatch function as an argument. This way, we can dispatch actions from within this function.
    // Generally we create actions in the createSlice function, but here we are creatging an action directly in the component and dispatching it. This is called as action creator
    
  }, [cart, dispatch]);
  

  return (
    <Fragment>
      {notification && (
        <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}


export default App;






// const sendCartData = async () => {

//   /**
//    * If we hover over the dispatch, then this is the format
//    * const dispatch: Dispatch
//       <{
//           payload: any;
//           type: "ui/showNotification";
//       }>
//    */
//   dispatch(
//     uiActions.showNotification({  // we wanted to create action creators, but react has already created these action creators here. Here we have writen the code in the component
//       status: 'pending',
//       title: 'Sending...',
//       message: 'Sending cart data!',
//     })
//   );
