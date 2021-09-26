import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userActions'
import { useForm } from '../hooks/useForm';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'element-react';

export const Login = ({ close }) => {
   const dispatch = useDispatch();
   const history = useHistory()
   const [userCredentials, handleChange, setUserCredentials] = useForm(null)
   const { loggedInUser } = useSelector(state => state.userModule)
   const [errorMsg, setErrorMsg] = useState('')
   const username = useRef();
   const password = useRef();

   useEffect(() => {
      setUserCredentials(userCredentials)
      if (loggedInUser) {
         close();
         history.push('/')
      }
   }, [loggedInUser])

   const onLogin = async (ev) => {
      ev.preventDefault()
      try {
         await dispatch(login(userCredentials))

         if (!loggedInUser) {
            setErrorMsg('שם משתמש או סיסמה לא נכונים')
            setTimeout(() => {
               setErrorMsg('')
            }, 2500)
         }

      } catch (err) {
         console.log('err: cannot login', err)
      }
   }

   return (
      <section className="login-popup">
         <form className="simple-form" onSubmit={onLogin}>
            <section className="form-login">
               <span className="material-icons-outlined close"
                  onClick={close}>close</span>
               <h1 className="title">התחברות</h1>
               <input type="text" placeholder="שם משתמש" ref={username}
                  name="username" onChange={() => { handleChange(username) }} />
               <input type="password" placeholder="סיסמה" ref={password}
                  name="password" onChange={() => { handleChange(password) }} />
               <button className="btn-login">התחבר</button>

               <Link className="to-signup" onClick={close} to="/signup"
               >עדין לא רשום?  הרשם כאן עכשיו...</Link>
               {errorMsg && <h2 className="form-errors">{errorMsg}</h2>}
            </section>
         </form>
       </section>
   )
}
