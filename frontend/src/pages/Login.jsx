import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userActions'
import { useForm } from '../hooks/useForm';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { Input } from 'element-react';

export const Login = () => {
   const dispatch = useDispatch();
   const history = useHistory()
   const [userCredentials, handleChange, setUserCredentials] = useForm(null)
   const {loggedInUser} = useSelector(state => state.userModule)
   const username = useRef();
   const password = useRef();
   
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
            <Input type="text" ref={username} name="username" onChange={() => { handleChange(username) }} placeholder="שם משתמש" />
         </label>
         <label>סיסמה:
         <Input type="Password" ref={password}  name="password" onChange={() => { handleChange(password) }} placeholder="סיסמה" />
         </label>
         <button>התחבר</button>
         <Link to="/signup">...עדין לא רשום?  הרשם עכשיו</Link>
      </form>
   )
}
