import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from '../assets/imgs/logo.png'
import { CartDisplay } from "./CartDisplay";
import searchImg from '../assets/imgs/search.svg'
import { SearchItemList } from "./SearchItemList";
import { useRef, useState } from "react";
import { useForm } from '../hooks/useForm';

export const AppHeader = ({ openMyOrder, isHomePage }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const { items } = useSelector(state => state.itemModule)
   const [itemsBySearch, setItemsBySearch] = useState([])
   const search = useRef()

   const styles = search.current?.getBoundingClientRect();

   const searchItem = async ({ name }) => {
      if (name?.length < 2) setItemsBySearch([])
      else {
         const itemToDisplay = items.filter(item => item.name.includes(name))
         setItemsBySearch(itemToDisplay)
      }
   }
   const [filterBy, handleChange] = useForm({ name: '' }, searchItem)

   return (
      <nav className={(isHomePage) ? 'app-header' : 'app-header mb20'}>
         <div className="nav-side-auth">
            {!loggedInUser && <div className="auth">
               <NavLink to="/login">התחברות</NavLink>
               &nbsp;<span>/</span> &nbsp;
               <NavLink to="/signup"> הרשמה</NavLink>
            </div>}

            {loggedInUser &&
               <NavLink className="auth" to="/user/profile"> שלום , {loggedInUser.fname} </NavLink>
            }
            <CartDisplay openMyOrder={openMyOrder} />
            <section className="search" ref={search}>
               <input type="text" placeholder="חיפוש" value={filterBy.name}
                  name="name" onChange={handleChange} autoComplete="off" />
               <img src={searchImg} alt="" onClick={handleChange} />
            </section>


            {filterBy.name.length > 1 && itemsBySearch.length > 0 &&
               <SearchItemList styles={styles} items={itemsBySearch} />}
            {filterBy.name.length > 1 && itemsBySearch.length === 0 &&
               <section className="search-item-list" style={{ 'left': styles?.left }} >
                  <h2>לא נמצאו תוצאות</h2></section>}

         </div>
         <NavLink exact to="/"> <img className="logo" src={logo} alt="" /> </NavLink>

         <div className="nav-side">
            <NavLink to="/items/fruits"> פירות </NavLink> |
            <NavLink to="/items/vegetables"> ירקות </NavLink>
         </div>
      </nav>
   )
}