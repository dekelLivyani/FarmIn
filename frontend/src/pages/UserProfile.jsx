import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userActions";
import {Signup} from '../pages/Signup';
import {RecentOrders} from '../cmps/RecentOrders';
import { NavLink,Route } from "react-router-dom";

export const UserProfile = () => {
   const dispatch = useDispatch()
   
   const onLogout = () => {
      dispatch(logout());
   }
   return (
      <section className="user-profile">
         <nav className="nav-profile">
            <NavLink to="/user/profile/orders">ההזמנות שלי</NavLink> 
            <NavLink to="/user/profile/details">פרטיים אישיים</NavLink> 
         <span onClick={onLogout}>התנתק</span>
         </nav>
         <section>
            <Route path="/user/profile/orders" component={RecentOrders} />
            <Route path="/user/profile/details" component={Signup} />
         </section>
      </section>
   )
}