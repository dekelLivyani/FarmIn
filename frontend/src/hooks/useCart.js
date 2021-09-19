import { useDispatch, useSelector } from "react-redux"
import { utilService } from "../services/util.service"
import { orderCart, updateCart } from "../store/actions/userActions";

export const useCart = (item) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const dispatch = useDispatch();
   var itemInCart;
   if (item) itemInCart = loggedInUser?.cart.find(i => i.item._id === item._id)

   const addToCart = () => {
      if (!loggedInUser) return;
      if (!itemInCart) {
         loggedInUser.cart.push({
            id: utilService.makeId(),
            item,
            count: 1
         });
      } else itemInCart.count++;
      dispatch(updateCart(loggedInUser.cart, item))
   }
   const removeFromCart = () => {
      if (!loggedInUser) return;
      if (itemInCart) {
         if (itemInCart.count > 1) itemInCart.count--;
         else {
            loggedInUser.cart = loggedInUser.cart.filter(i => i.item._id !== item._id)
         }
         dispatch(updateCart(loggedInUser.cart, item, -1))
      }
   }
   const removeAllItems = () => {
      if (!loggedInUser) return;
      loggedInUser.cart = loggedInUser.cart.filter(i => i.item._id !== item._id)
      dispatch(updateCart(loggedInUser.cart, item, -1))
   }

   const cleanCart = () => {
      if (!loggedInUser) return;
      loggedInUser.cart = []
      dispatch(updateCart(loggedInUser.cart))
   }

   const completeOrder = () => {
      if (!loggedInUser) return;
      dispatch(orderCart(loggedInUser.cart))
   }

   return [
      addToCart,
      removeFromCart,
      removeAllItems,
      cleanCart,
      completeOrder
   ]
}



