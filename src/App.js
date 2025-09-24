import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { use, useEffect } from 'react';

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector ( (state) => state.cart );

  // this effect funciton will be called whenever any changes were made in the cart. However the cart is using selector, so a subsciption to store is setup. which will update this cart whenever it changes
  useEffect( () => {
    fetch ( 'https://test-mode-20260-default-rtdb.firebaseio.com/cart.json', 
      {method : 'PUT', 
       body : JSON.stringify(cart)
      })
  }, [cart] );

  // This fetch will ensure that the data is stored there, we are using PUT so it will always update the existing data in it
  // All the data manupulations should be done in the backend, but due to the course restrictions, we need to move it to frontend and only store the data

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
