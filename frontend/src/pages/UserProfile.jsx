import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";
import { Signup } from '../pages/Signup';
import { RecentOrders } from '../cmps/RecentOrders';
import { Link, NavLink, Route } from "react-router-dom";
import { useHistory} from "react-router";
import { useEffect } from "react";


export const UserProfile = () => {
   const dispatch = useDispatch()
   const history = useHistory()

   useEffect(() => {
      if (history.location.pathname === '/user/profile' ||
         history.location.pathname === '/user/profile/') {
         history.push('/user/profile/orders')
      }
   }, [history.location.pathname])

   const onLogout = () => {
      dispatch(logout());
   }

   return (
      <section className="user-profile">
         <aside>
            <h1 className="title">:האיזור האישי</h1>   
            <nav className="nav-profile">
               <NavLink to="/user/profile/orders">
               <span className="txt"> ההזמנות שלי </span>
                  <span className="material-icons-outlined icon orders">shopping_cart</span>
                  
               </NavLink>
               <NavLink to="/user/profile/details">
               <span className="txt"> פרטיים אישיים </span>
                  <span className="material-icons-outlined icon edit">edit</span>
                 
               </NavLink>
               <Link to="/" onClick={onLogout}>
                  <span className="txt">התנתק </span>
                  <span className="material-icons-outlined icon logout">logout</span>
               </Link>
            </nav>
         </aside>
          
         <section className="main">
            <Route path="/user/profile/orders" component={RecentOrders} />
            <Route path="/user/profile/details" component={Signup} />
         </section>
      </section>
   )
}