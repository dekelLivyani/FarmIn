import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import cart from '../assets/imgs/cart.png'

export const CartDisplay = ({ openMyOrder = () => { }, isMyOrderPage = false }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const [totalPrice, setTotalPrice] = useState(loggedInUser?.total)
   const [isUserAddItem, setIsUserAddItem] = useState(false)
   let timeOut = useRef()

   useEffect(() => {
      if (loggedInUser?.total > totalPrice) {
         if (timeOut.current) clearTimeout(timeOut.current)

         setIsUserAddItem(true);
          setTimeout(() => {
            setIsUserAddItem(false);
            clearTimeout(timeOut.current)
         }, 1000)
      }
      setTotalPrice(loggedInUser?.total);
           // eslint-disable-next-line
   }, [loggedInUser?.total])

   return (
      <div className={(isMyOrderPage && isUserAddItem)
         ? "cart is-my-order-page is-adding" :
         (isMyOrderPage && !isUserAddItem) ? "cart is-my-order-page" :
            (!isMyOrderPage && isUserAddItem) ? "cart is-adding"
               : "cart"}
         onClick={openMyOrder}>
         <span className="cart-total">
            {(loggedInUser) ? (loggedInUser.total).toFixed(2) : '0.00'}₪
         </span>
         <div>
            <span className="cart-count">
               {(loggedInUser) ? loggedInUser.cart.length : 0}</span>
            <img className="cart-icon" src={cart} alt="" />
         </div>
      </div>
   )
}