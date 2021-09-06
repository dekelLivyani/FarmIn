import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { signup,update } from '../store/actions/userActions'
import { useForm } from '../hooks/useForm';

export const Signup = ({ history, }) => {
   const dispatch = useDispatch();
   const { loggedInUser } = useSelector(state => state.userModule)
   console.log('loggedInUser', loggedInUser)
   const initialState = (loggedInUser)? loggedInUser : userService.getEmptyUser()
   const [userToSign, handleChange] = useForm(initialState)

   const onSignUp = async (ev) => {
      ev.preventDefault()
      try {
         if(!userToSign._id) await dispatch(signup(userToSign))
         else await dispatch(update(userToSign))
         history.push('/')
      } catch (err) {
         console.log('err: cannot signup', err)
      }
   }

   return (
      <form className="form-login simple-form" onSubmit={ onSignUp}>
         <label>שם פרטי:
            <input type="text" name="fname" value={userToSign.fname} onChange={handleChange} placeholder="שם פרטי" />
         </label>
         <label>שם משפחה:
            <input type="text" name="lname" value={userToSign.lname} onChange={handleChange} placeholder="שם משפחה" />
         </label>
         <label>שם משתמש:
            <input type="text" name="username" value={userToSign.username} onChange={handleChange} placeholder="שם משתמש" />
         </label>
         <label>סיסמה:
            <input type="Password" name="password" value={userToSign.password} onChange={handleChange} placeholder="סיסמה" />
         </label>
         <label>אימייל:
            <input type="email" name="email" value={userToSign.email} onChange={handleChange} placeholder="אימייל" />
         </label>
         <label>טלפון:
            <input type="number" name="phone" value={userToSign.phone} onChange={handleChange} placeholder="טלפון" />
         </label>
         <h1>Address:</h1>
         <label>עיר:
            <input type="text" name="city" value={userToSign.addresses.city} onChange={handleChange} placeholder="עיר" />
         </label>
         <label>רחוב:
            <input type="text" name="street" value={userToSign.addresses.street} onChange={handleChange} placeholder="רחוב" />
         </label>
         <label>מספר בית:
            <input type="number" name="number" value={userToSign.addresses.number} onChange={handleChange} placeholder="מספר בית" />
         </label>
         <button>{(!userToSign._id)?'הרשם':'שמור'}</button>
      </form>
   )
}
