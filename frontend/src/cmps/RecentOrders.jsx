import { useState } from "react";
import { useSelector } from "react-redux";
import { ItemOrderList } from "./ItemOrderList";
import profileNavImg from '../assets/imgs/profile-nav.gif'
import Select from 'react-select'

export const RecentOrders = () => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const [currOrder, setCurrOrder] = useState(loggedInUser.historyCart[0])

   const onSetCurrOrder = ({ value }) => {
      const order = loggedInUser.historyCart.find(c => c.id === value)
      setCurrOrder(order)
   }


   if (!loggedInUser.historyCart.length) return (<h2 className="text-center">.אף הזמנה לא נעשתה עדיין</h2>)
   return (
      <section className="recent-orders">
         <div className="left-side">
            <label>
               <Select className="order-select" placeholder="בחר הזמנה" onChange={onSetCurrOrder}
                  options={loggedInUser.historyCart.map((orders, idx) => (
                     {
                        value: orders.id,
                        label: `(${loggedInUser.historyCart.length - idx}) ` +
                           new Date(orders.date).toLocaleString()
                     }
                  ))} />
              <span className="my-order-txt"> &nbsp; :ההזמנות שלי </span>
            </label>
            <h1 className="total-price">
               סה"כ:&nbsp;
               <span>{currOrder.totalPrice.toFixed(2)}₪</span>
            </h1>
            <img src={profileNavImg} alt="" />
         </div>
         <div className="right-side">
            <ItemOrderList cart={currOrder.cart} isRecentOrder={true} />
         </div>
      </section>
   )
}