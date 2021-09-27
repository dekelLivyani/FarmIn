import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getItemById, loadItems, removeItem as deleteItem } from "../store/actions/itemActions"
import { useCart } from "../hooks/useCart";
import sale from '../assets/imgs/sale.png'

export const ItemPreview = ({ item }) => {
   const dispatch = useDispatch();
   const { loggedInUser } = useSelector(state => state.userModule)
   const [itemCount, setItemCount] = useState(0)
   const [addToCart, removeFromCart] = useCart(item)

   useEffect(() => {
      const itemInCart = loggedInUser?.cart.find(i => i.item._id === item._id)
      if (itemInCart) setItemCount(itemInCart.count)
      else setItemCount(0)
   }, [loggedInUser?.cart])

   const openDetails = () => {
      dispatch(getItemById(item._id))
   }

   const removeItem = async () => {
      try {
         await dispatch(deleteItem(item._id))
         dispatch(loadItems());
      } catch (err) {
         console.log('err : cannot remove item', err)
      }
   }
   const priceAfterDiscount = () => {
      return (item.price - (item.sale.salePercent / 100 * item.price)).toFixed(2);
   }

   return (
      <section className="item-preview" onClick={openDetails}>
         {loggedInUser?.isAdmin && <>
            <Link to={"/items/edit/" + item._id} onClick={(ev) => {
               ev.stopPropagation();
            }}
               className="edit">
               <span className="material-icons-outlined">edit</span>
            </Link>
            <span className="material-icons-outlined remove-item"
               onClick={(ev) => {
                  ev.stopPropagation();
                  removeItem();
               }}
            >delete</span>
         </>
         }
         {item.sale.onSale && <img src={sale} className="sale-img" alt="" />}
         <img className="img" src={item.img} alt="" />
         <section className="under-line">
            {itemCount > 0 && <span className="item-count">{itemCount}</span>}

            {loggedInUser && <div className="actions">
               <button className="btn-to-card" onClick={(ev) => {
                  ev.stopPropagation();
                  addToCart()
               }}>
                  <span className="material-icons-outlined">add</span>
               </button>
               <span className="item-count-inside">{itemCount}</span>
               <button className="btn-to-card" onClick={(ev) => {
                  ev.stopPropagation();
                  removeFromCart()
               }}>
                  <span className="material-icons-outlined">remove</span>
               </button>
            </div>}
            {loggedInUser && <div></div>}
            {item.sale.onSale && <span className="discount">
               &nbsp; {item.sale.salePercent}% <span>הנחה</span> </span>}

         </section>
         <div className="info">
            <h2 className="name">{item.name}</h2>

            <div className="flex j-end price">
               <span> {item.priceBy} &nbsp;/</span>
               {item.sale.onSale && <span className="price-by-discount">
                  &nbsp; ₪ {priceAfterDiscount()} &nbsp; </span>}
               <span className={(item.sale.onSale) ? 'sale-price' : ''}>
                  &nbsp;₪ {item.price}</span>
            </div>

            {item.weight > 0 && <p className="weight" >{item.weightInfo}</p>}
         </div>
      </section>
   )
}