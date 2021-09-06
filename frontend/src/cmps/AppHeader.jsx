import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/imgs/logo.png'
import cart from '../assets/imgs/cart.png'

export const AppHeader = () => {
   const { loggedInUser } = useSelector(state => state.userModule)
   return (
      <nav className="app-header">
         <div className="nav-side-auth">
            {loggedInUser && <NavLink to="/user/profile"> שלום, {loggedInUser.fname} </NavLink>}
            {!loggedInUser && <>
               <NavLink to="/login"> התחברות </NavLink>/
               <NavLink to="/signup"> הרשמה </NavLink>
            </>}
            <div className="cart">
               <span className="cart-total"> 
               {(loggedInUser)? loggedInUser?.total : 0}₪</span>
               <span className="cart-count">
                  {(loggedInUser)? loggedInUser?.cart.length : 0}</span> 
               <img className="cart-icon" src={cart} alt="" />
               {/* <span className="material-icons-outlined cart-icon">shopping_cart</span> */}
            </div>

         </div>
         <NavLink exact to="/"> <img className="logo" src={logo} alt="" /> </NavLink>

         <div className="nav-side">
            <NavLink to="/items/fruits"> פירות </NavLink> |
            <NavLink to="/items/vegetables"> ירקות </NavLink>
         </div>
      </nav>
   )
}