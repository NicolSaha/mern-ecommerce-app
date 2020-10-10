import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // FOR EACH ITEM IN CURRENTSTATE CARTITEMS, ID IS EQUAL TO CURRENT ITEM THEN EXISTS ELSE FALSE
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // PUSH IT INTO ARRAY
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
