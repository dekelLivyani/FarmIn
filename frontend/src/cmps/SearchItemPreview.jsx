import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { getItemById, loadItems, removeItem as deleteItem } from "../store/actions/itemActions"

export const SearchItemPreview = ({ item }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const dispatch = useDispatch()
   const [addToCart, removeFromCart] = useCart(item)
   const [isItemOpen, setIsItemOpen] = useState(false)

   const priceAfterDiscount = () => {
      if (item.sale.onSale) {
         return (item.price - (item.sale.salePercent / 100 * item.price)).toFixed(2);
      } else return item.price;
   }

   const countInCart = () => {
      if (!loggedInUser) return 0;
      return loggedInUser.cart.reduce((acc, fullItem) => {
         if (fullItem.item._id === item._id) acc = fullItem.count;
         return acc;
      }, 0)
   }

   const removeItem = async () => {
      try {
         await dispatch(deleteItem(item._id))
         dispatch(loadItems());
      } catch (err) {
         console.log('err : cannot remove item', err)
      }
   }

   const openDetails = () => {
      dispatch(getItemById(item._id))
   }

   return (
      <section className="search-item-preview" onClick={() => setIsItemOpen(!isItemOpen)}>
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
         <section className="search-container">
            {isItemOpen && <button className="btn-to-detail" onClick={(ev) => {
               ev.stopPropagation();
               openDetails()
            }}>
               <span className="material-icons-outlined">info</span>
            </button>}
            <div className="info">
               <h2 className="name">{item.name}</h2>

               {/* <div className="flex j-end price">
                  <span> {item.priceBy}&nbsp;/</span>
                  <span className="price"> &nbsp; ₪ {priceAfterDiscount()} </span>
               </div> */}

               <div className="flex j-end price">
               <span> {item.priceBy} &nbsp;/</span>
               {item.sale.onSale && <span className="price-by-discount">
                  &nbsp; ₪ {priceAfterDiscount()} &nbsp; </span>}
               <span className={(item.sale.onSale) ? 'sale-price' : ''}>
                  &nbsp;₪ {item.price}</span>
               </div>
               
               {item.weight > 0 && <p className="weight" > כ - {item.weight} ק"ג בממוצע</p>}
            </div>
            <img className="img" src={item.img} alt="" />
         </section>
         {isItemOpen && <section className="actions">
            <button className="btn-to-card" onClick={(ev) => {
               ev.stopPropagation();
               addToCart()
            }}>
               <span className="material-icons-outlined">add</span>
            </button>
            <span className="count">{countInCart()}</span>
            <button className="btn-to-card" onClick={(ev) => {
               ev.stopPropagation();
               removeFromCart();
            }}>
               <span className="material-icons-outlined">remove</span>
            </button>
         </section>}
      </section>
   )
}