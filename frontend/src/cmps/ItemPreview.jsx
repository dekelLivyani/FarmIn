import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import { utilService } from "../services/util.service";
import { loadItems, removeItem as deleteItem } from "../store/actions/itemActions"
import { updateCart } from "../store/actions/userActions";


export const ItemPreview = ({ item }) => {
   const dispatch = useDispatch();
   const { loggedInUser } = useSelector(state => state.userModule)
   const [itemCount, setItemCount] = useState(0)
   useEffect(() => {
      const itemInCart = loggedInUser?.cart.find(i => i.item._id === item._id)
      if(itemInCart) setItemCount(itemInCart.count)
      else setItemCount(0)
   }, [loggedInUser?.cart])

   const addToCart = () => {
      const itemInCart = loggedInUser.cart.find(i => i.item._id === item._id)
      if (!itemInCart) {
         loggedInUser.cart.push({
            id: utilService.makeId(),
            item: item,
            count: 1
         });
      } else itemInCart.count++;
      dispatch(updateCart(loggedInUser.cart,item))
   }
   const removeFromCart = () => {
      const itemInCart = loggedInUser.cart.find(i => i.item._id === item._id)
      if (itemInCart) {
         if(itemInCart.count > 1) itemInCart.count--;
         else {
            loggedInUser.cart = loggedInUser.cart.filter(i => i.item._id !== item._id)
         }
         dispatch(updateCart(loggedInUser.cart,item,-1))
      }
   }
   const removeItem = async () => {
      try {
         await dispatch(deleteItem(item._id))
         dispatch(loadItems());
      } catch (err) {
         console.log('err : cannot remove item', err)
      }
   }

   return (
      <section className="item-preview">
         {loggedInUser?.isAdmin && <>
            <Link to={"/items/edit/" + item._id} className="edit">
               <span className="material-icons-outlined">edit</span>
            </Link>
            <span className="material-icons-outlined remove-item"
               onClick={removeItem}>delete</span>
         </>
         }
         <img className="img" src={item.img} alt="" />
         {itemCount > 0 && <span className="item-count">{itemCount}</span>}
         <div className="info">
            <h2 className="name">{item.name}</h2>
            <div className="flex j-end price">
               <span> {item.priceBy} &nbsp;/</span>
               <span> &nbsp; ₪ {item.price} </span>
            </div>
            {item.weight > 0 && <p className="weight" > כ - {item.weight} ק"ג בממוצע</p>}
            {loggedInUser && <div className="buttons">
               <button className="btn-to-card" onClick={addToCart}>
               <span className="material-icons-outlined">add</span>
               </button>
               <button className="btn-to-card" onClick={removeFromCart}>
               <span className="material-icons-outlined">remove</span>
               </button>
            </div>}
         </div>
      </section>
   )
}