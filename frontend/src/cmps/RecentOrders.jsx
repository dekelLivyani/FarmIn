import { useState } from "react";
import { useSelector } from "react-redux";
import { ItemOrderList } from "./ItemOrderList";

export const RecentOrders = () => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const [currOrder, setCurrOrder] = useState(loggedInUser.historyCart[0])

   const onSetCurrOrder = (ev) => {
      const order = loggedInUser.historyCart.find(c => c.id === ev.target.value)
      setCurrOrder(order)
   }
   return (
      <section className="recent-orders">
         <section>
            <select name="orders" onChange={onSetCurrOrder}>
               {loggedInUser.historyCart.map(orders => (
                  <option key={orders.id}
                     value={orders.id}>
                     {new Date(orders.date).toLocaleString()}</option>
               ))}
            </select>
         </section>
         <h1>סה"כ: <span>{currOrder.totalPrice}₪</span></h1>
         <ItemOrderList cart={currOrder.cart} isRecentOrder={true} />
      </section>
   )
}