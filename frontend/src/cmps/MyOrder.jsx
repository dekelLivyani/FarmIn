import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ItemOrderList } from "./ItemOrderList"
import loading from '../assets/imgs/loading2.gif'
import { useState } from "react"
import { useHistory } from "react-router"
import { setUserMsg } from "../store/actions/userActions"
import { useCart } from "../hooks/useCart"
import cart from '../assets/imgs/cart.png'
import { CartDisplay } from "./CartDisplay"

export const MyOrder = ({ isOpen, closeMyOrder }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const [isLoading, setIsLoading] = useState(false)
   const history = useHistory()
   const [addToCart, removeFromCart, removeAllItems, cleanCart,completeOrder] = useCart()
   const dispatch = useDispatch()

   const CompleteOrder = async () => {
      let msg = {};
      try {
         setIsLoading(true);
         setTimeout(() => {
            completeOrder()
         msg = {
            txt: "ההזמנה בוצעה בהצלחה",
            type: "success",
            };
         }, 1000);

      } catch (err) {
         msg = {
            txt: "ההזמנה נכשלה, נסה שוב מאוחר יותר",
            type: "error",
         };
      } finally {
         setTimeout(() => {
            setIsLoading(false);
            closeMyOrder();
            dispatch(setUserMsg(msg))
            // history.push('user/profile/orders')
         }, 1000);
      }
   }
   return (
      <section className={(isOpen) ? 'is-open my-order' : 'my-order'}>
         <main>

            <header className="header-order">
               <CartDisplay isMyOrderPage={true}/>
            <section className="header-container" onClick={cleanCart}>
               <span className="material-icons-outlined icon">delete</span>
               <span>נקה עגלה</span>
            </section>
            <h1 className="title">העגלה שלי</h1>
            <span className="material-icons-outlined close-btn" onClick={closeMyOrder}
            >close</span>
         </header>

            {!loggedInUser && (<h1 className="text-center pointer"
               onClick={() => {
                  closeMyOrder();
                  history.push('/login')
               }}> התחבר בבקשה</h1>)}
         {loggedInUser && < section className="item-container">

               {loggedInUser.total > 0 &&
                  <section className="cart-list">
                     <ItemOrderList cart={loggedInUser.cart} />
                  </section>}         

            {loggedInUser.total <= 0 && <section className="cart-empty">
               <p> ...סל הקניות ריק</p>
               <Link to="/items" className="start-here"
                  onClick={closeMyOrder}>לחץ כאן כדי להתחיל</Link>
            </section>}
         </section>}
         </main>
         
         {loggedInUser && loggedInUser.total > 0 && <footer>
                  <h1>סה"כ: <span>₪ {loggedInUser.total.toFixed(2)}</span></h1>
                  <section className="complete-order"
                     onClick={CompleteOrder}> {isLoading &&
                        <img className="loading-img" src={loading} alt="" />}
                     <span>בצע הזמנה</span>
                  </section>
               </footer>}
      </section>
   )
}