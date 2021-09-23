import { ItemOrderPreview } from "./ItemOrderPreview"
import { useEffect, useState } from "react"
import { ItemFilter } from "./ItemFilter";

export const ItemOrderList = ({ cart, isRecentOrder }) => {
   const [currCart, setCurrCart] = useState(cart);
   
   useEffect(() => {
      setCurrCart(cart) 
   }, [cart])

   const onChangeFilter = (filterBy) => {
      const cartToDisplay = cart.filter(fullItem => {
         return fullItem.item.name.includes(filterBy.term)
      })
      setCurrCart(cartToDisplay)
   }
   return (
      <>
         <ItemFilter onChangeFilter={onChangeFilter}/>
         <section className="item-order-list">
            {currCart.length > 0 && currCart.map(item => (
               <ItemOrderPreview key={item.id} fullItem={item} isRecentOrder={isRecentOrder} />
            ))}
            {!currCart.length && <h2> לא נמצאו פריטים </h2>}
         </section>
      </>
   )
}