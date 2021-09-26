import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import personIcon from '../assets/imgs/person-icon.png' 

export const Auth = ({openLogin}) => {
   const { loggedInUser } = useSelector(state => state.userModule)

   return (
      <>
         {!loggedInUser && <div className="auth">
            <span className="login-btn" onClick={openLogin}>התחברות</span>
            &nbsp;<span>/</span> &nbsp;
            <NavLink to="/signup"> הרשמה</NavLink>
         </div>}

         {loggedInUser &&
            <NavLink className="auth" to="/user/profile">
            שלום, {loggedInUser.fname}
            <img className="person-icon-img" src={personIcon} alt="" />
         </NavLink>
            
         }
      </>
   )
}