import { ItemOrderPreview } from "./ItemOrderPreview"
import { useForm } from "../hooks/useForm"
import { useEffect, useState } from "react"

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
   const [filterBy, handleChange] = useForm({ term: '' }, onChangeFilter)

   return (
      <>
         <input type="text" name="term" className="searchItem" value={filterBy.term}
            placeholder="Search..." onChange={handleChange} />
         <section className="item-order-list">
            {currCart.map(item => (
               <ItemOrderPreview key={item.id} fullItem={item} isRecentOrder={isRecentOrder} />
            ))}
         </section>
      </>
   )
}