import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { signup, update } from '../store/actions/userActions'
import { useForm } from '../hooks/useForm';
import { Input,Button } from 'element-react';
import { useRef } from 'react';

export const Signup = ({ history, }) => {
   const dispatch = useDispatch();
   const { loggedInUser } = useSelector(state => state.userModule)
   const initialState = (loggedInUser) ? loggedInUser : userService.getEmptyUser()
   const [userToSign, handleChange] = useForm(initialState)

   const fname = useRef();
   const lname = useRef();
   const username = useRef();
   const password = useRef();
   const email = useRef();
   const phone = useRef();
   const city = useRef();
   const street = useRef();
   const number = useRef();

   const onSignUp = async (ev) => {
      ev.preventDefault()
      try {
         if (!userToSign._id) await dispatch(signup(userToSign))
         else await dispatch(update(userToSign))
         history.push('/')
      } catch (err) {
         console.log('err: cannot signup', err)
      }
   }

   return (
      <form className="form-signup" onSubmit={onSignUp}>
         <section className="part1">
            <h1 className="sub-title">פרטים אישיים:</h1>
            <section className="full-name">
               <label>שם פרטי:
                  <Input type="text" ref={fname} name="fname" value={userToSign.fname}
                     onChange={() => { handleChange(fname) }} placeholder="שם פרטי" />
               </label>
               <label>שם משפחה:
                  <Input type="text" ref={lname} name="lname" value={userToSign.lname}
                     onChange={() => { handleChange(lname) }} placeholder="שם משפחה" />
               </label>
            </section>
            <label>שם משתמש:
               <Input type="text" ref={username} name="username" value={userToSign.username}
                  onChange={() => { handleChange(username) }} placeholder="שם משתמש" />
            </label>
            <label>סיסמה:
               <Input type="Password" ref={password} name="password" value={userToSign.password}
                  onChange={() => { handleChange(password) }} placeholder="סיסמה" />
            </label>
            <label>אימייל:
               <Input type="email" ref={email} name="email" value={userToSign.email}
                  onChange={() => { handleChange(email) }} placeholder="אימייל" />
            </label>
            <label>טלפון:
               <Input type="number" ref={phone} name="phone" value={userToSign.phone}
                  onChange={() => { handleChange(phone) }} placeholder="טלפון" />
            </label>
         </section>
         <section className="part2">
            <h1 className="sub-title">כתובת:</h1>
            <label>עיר:
               <Input type="text" ref={city} name="city" value={userToSign.addresses.city}
                  onChange={() => { handleChange(city) }} placeholder="עיר" />
            </label>
            <label>רחוב:
               <Input type="text" ref={street} name="street" value={userToSign.addresses.street}
                  onChange={() => { handleChange(street) }} placeholder="רחוב" />
            </label>
            <label>מספר בית:
               <Input type="number" ref={number} name="number" value={userToSign.addresses.number}
                  onChange={() => { handleChange(number) }} placeholder="מספר בית" />
            </label>
            <Button type="primary" onClick={onSignUp}>{(!userToSign._id) ? 'הרשם' : 'שמור'}</Button>
         </section>
      </form>
   )
}
