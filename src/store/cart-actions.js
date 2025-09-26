import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const sendCartData = (cart) => {
    return async (dispatch) => {   // redux-thunk middleware will call this function with the dispatch function as an argument
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            const response = await fetch(
                'https://test-mode-20260-default-rtdb.firebaseio.com//cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }
                    ),
                }
            );

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        };

        try {
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    };
};


export const getCartData = () => {
    return async (dispatch) => {

        const getDataFromFirebase = async () => {
            const response = await fetch('https://test-mode-20260-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch cart data!');
            }
            const data = await response.json();

            // In general to dispatch an action, we need a dispatch = useDispatch() hook in the component, but here we are in a function, so we can use the dispatch function that is passed as an argument to this function by the redux-thunk middleware
            cartActions.replaceCart({
                items: data.items || [],
                totalQuantity: data.totalQuantity,
            });
        }

        try {
            await getDataFromFirebase();
        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    };
}