import { useDispatch, useSelector } from "react-redux";
import { currItemToNull } from "../store/actions/itemActions"
import sale from '../assets/imgs/sale.png'
import { useCart } from "../hooks/useCart";
import { useState } from "react";

export const ItemDetail = ({ item }) => {
   const dispatch = useDispatch();
   const { loggedInUser } = useSelector(state => state.userModule)
   const [addToCart, removeFromCart] = useCart(item)
   const [showLoginFirst, setShowLoginFirst] = useState(false)

   const close = () => {
      dispatch(currItemToNull())
   }
   
   const addItemToCart = () => {
      if (loggedInUser) addToCart();
      else {
         setShowLoginFirst(true)
         setTimeout(() => {
            setShowLoginFirst(false)
         },5000)
      }
   }
   const priceAfterDiscount = () => {
      if (item.sale.onSale) {
         return (item.price - (item.sale.salePercent / 100 * item.price)).toFixed(2);
      } else return item.price;
   }

   const isItemInCart = () => {
      const itemIdx = loggedInUser?.cart.findIndex(fullItem => {
         return fullItem.item._id === item._id
      })
      return (!itemIdx || itemIdx === -1) ? false : true;
   }

   const countInCart = () => {
      return loggedInUser?.cart.reduce((acc, fullItem) => {
         if (fullItem.item._id === item._id) acc = fullItem.count;
         return acc;
      }, 0)
   }

   return (
      <section className="item-detail">
         <span className="material-icons-outlined close"
            onClick={close}>close</span>

         {item.sale.onSale &&
            <>
               <img className="img-sale" src={sale} alt="" />
               <span className="discount">
                  &nbsp; {item.sale.salePercent}% <span>הנחה</span> </span>
            </>}

         <div className="info">
            <h1 className="name">{item.name}</h1>

            <div className="flex j-end a-end column">
               <div className="flex j-end price">
                  <span> {item.priceBy} &nbsp;/</span>
                  {item.sale.onSale && <span className="price-by-discount">
                     &nbsp; ₪ {priceAfterDiscount()} &nbsp; </span>}
                  <span className={(item.sale.onSale) ? 'sale-price' : ''}>
                     &nbsp;₪ {item.price}</span>
               </div>
               {item.weight > 0 && <p className="weight">
                  (כ - {item.weight} ק"ג בממוצע)  </p>}
            </div>

            <p className="info-txt">{item.info}</p>

            {!isItemInCart() && <button className="btn-add-to-cart"
               onClick={addItemToCart} >הוספה לעגלה</button>}
            {showLoginFirst && <h1 className="login-alert">
               נדרש להתחבר כדי לבצע פעולה זו</h1>}

            {isItemInCart() && <section className="actions">
               <button className="btn-to-card" onClick={addToCart}>
                  <span className="material-icons-outlined">add</span>
               </button>
               <span className="count">{countInCart()}</span>
               <button className="btn-to-card" onClick={removeFromCart}>
                  <span className="material-icons-outlined">remove</span>
               </button>
            </section>}
         </div>
         <img className="item-img" src={item.img} alt="" />
      </section>
   )
}