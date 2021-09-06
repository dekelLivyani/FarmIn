import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../store/actions/userActions'
import { useForm } from '../hooks/useForm';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export const Login = () => {
   const dispatch = useDispatch();
   const history = useHistory()
   const [userCredentials, handleChange, setUserCredentials] = useForm(null)
   const {loggedInUser} = useSelector(state => state.userModule)

   useEffect(() => {
      setUserCredentials(userCredentials)
   }, [loggedInUser])

   const onSingUp = async (ev) => {
      ev.preventDefault()
      try {
         await dispatch(login(userCredentials))
         history.push('/')
      } catch (err) {
         console.log('err: cannot login', err)
      }
   }


   return (
      <form className="form-login simple-form" onSubmit={onSingUp}>
         <label>שם משתמש:
            <input type="text" name="username" onChange={handleChange} placeholder="שם משתמש" />
         </label>
         <label>סיסמה:
            <input type="Password" name="password" onChange={handleChange} placeholder="סיסמה" />
         </label>
         <button>התחבר</button>
         <Link to="/signup">...עדין לא רשום?  הרשם עכשיו</Link>
      </form>
   )
}
