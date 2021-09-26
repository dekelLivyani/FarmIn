import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import logo from '../assets/imgs/logo.png'
import { CartDisplay } from "./CartDisplay";
import searchImg from '../assets/imgs/search.svg'
import { SearchItemList } from "./SearchItemList";
import { useRef, useState } from "react";
import { useForm } from '../hooks/useForm';
import useOutsideClick from "../hooks/useOutSideClick";
import { Auth } from "./Auth";
import fruits from '../assets/imgs/fruits.png'
import vegetables from '../assets/imgs/vegetables.gif'

export const AppHeader = ({ openMyOrder, isHomePage, openLogin, isMenuOpen,
   setIsMenuOpen, setDarkScreen }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const { items } = useSelector(state => state.itemModule)
   const [itemsBySearch, setItemsBySearch] = useState([])
   const [isSearchOpen, setIsSearchOpen] = useState(false)
   const search = useRef()
   const styles = search.current?.getBoundingClientRect();

   const searchItem = async ({ name }) => {
      if (name?.length < 2) setItemsBySearch([])
      else {
         const itemToDisplay = items.filter(item => item.name.includes(name))
         setItemsBySearch(itemToDisplay)
      }
   }
   const closeSearch = () => {
      setItemsBySearch([])
      setFilterBy(prevFilterBy => ({ ...prevFilterBy, name: '' }))
      setIsSearchOpen(false);
   }

   const openSearch = () => {
      setIsSearchOpen(!isSearchOpen)
   }

   useOutsideClick(search, closeSearch)
   const [filterBy, handleChange, setFilterBy] = useForm({ name: '' }, searchItem)

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      (isMenuOpen) ? setDarkScreen(false) : setDarkScreen(true)
   }
   return (
      <nav className={(isHomePage) ? 'app-header' : 'app-header mb20'}>
         <div className="nav-side-auth">

            <img src={searchImg} className="search-icon"
               onClick={openSearch} id="search-img1" />

            {isSearchOpen && <section className="search-popup" ref={search}>
               <section className="search" >
                  <input type="text" placeholder="חיפוש" value={filterBy.name}
                     name="name" id="search-name" onChange={handleChange} autoComplete="off" />
                  <img src={searchImg} alt="" id="search-img" onClick={handleChange} />
               </section>

               {filterBy.name.length > 1 && itemsBySearch.length > 0 &&
                  <SearchItemList styles={styles} items={itemsBySearch} closeSearch={closeSearch} />}
               {filterBy.name.length > 1 && itemsBySearch.length === 0 &&
                  <section className="search-item-list" style={{ 'left': styles?.left }} >
                     <h2>לא נמצאו תוצאות</h2></section>}
            </section>}
            <section className="auth-in-header">
               <Auth openLogin={openLogin} />
            </section>

            <CartDisplay openMyOrder={openMyOrder} />
         </div>
         <NavLink exact to="/"> <img className="logo" src={logo} alt="" /> </NavLink>

         {isMenuOpen && <div className="nav-side">
            <section className="auth-in-side">
               <section onClick={toggleMenu}>
               <Auth openLogin={openLogin} />
               </section>
               <span className="material-icons-outlined close-btn" onClick={toggleMenu}
               >close</span>
            </section>
            <NavLink className="nav-link" onClick={toggleMenu} to="/items/fruits">
               פירות
               <img className="img-nav" src={fruits} alt="" />
            </NavLink>
            <NavLink className="nav-link" onClick={toggleMenu} to="/items/vegetables">
               ירקות
               <img className="img-nav" src={vegetables} alt="" />
            </NavLink>
         </div>}
         <button className="menu-btn" onClick={toggleMenu}>
            <span className="material-icons-outlined">menu</span>
         </button>
      </nav>
   )
}