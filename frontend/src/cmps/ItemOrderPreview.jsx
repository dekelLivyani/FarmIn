import { useCart } from "../hooks/useCart"

export const ItemOrderPreview = ({ fullItem ,isRecentOrder}) => {
   const [addToCart, removeFromCart, removeAllItems] = useCart(fullItem.item)

   const totalPricePerItem = () => {
      const { weight, price, sale } = fullItem.item;
      const { count } = fullItem;
      let totalPrice = (weight > 0) ? price * weight * count : price * count
      return (sale.onSale) ? totalPrice - sale.salePercent / 100 * totalPrice : totalPrice
   }

   return (
      <section className="item-order-preview">
         {!isRecentOrder && <span className="material-icons-outlined delete-item"
            onClick={removeAllItems}>close</span>}
         <span className="price">{totalPricePerItem().toFixed(2)} ₪</span>
         {!isRecentOrder && <section className="actions">
            <button className="btn-to-card" onClick={addToCart}>
               <span className="material-icons-outlined">add</span>
            </button>
            <span className="count">{fullItem.count}</span>
            <button className="btn-to-card" onClick={removeFromCart}>
               <span className="material-icons-outlined">remove</span>
            </button>
         </section>}

         {isRecentOrder && <span className="actions">{fullItem.count}</span>}
         
         <span className="name">{fullItem.item.name}</span>
         <img className="img" src={fullItem.item.img} alt="" />
      </section>
   )
}