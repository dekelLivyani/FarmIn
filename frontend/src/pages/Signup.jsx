import { userService } from '../services/user.service'
import { useDispatch, useSelector } from 'react-redux';
import { setUserMsg, signup, update } from '../store/actions/userActions'
import { useForm } from '../hooks/useForm';
import { Input, Button } from 'element-react';
import { useRef, useState } from 'react';

export const Signup = ({ history, }) => {
   const dispatch = useDispatch();
   const { loggedInUser } = useSelector(state => state.userModule)
   const initialState = (loggedInUser) ? loggedInUser : userService.getEmptyUser()
   const [userToSign, handleChange, setFields, handleValidation] = useForm(initialState)
   const [errors, setErrors] = useState({})

   const fname = useRef();
   const lname = useRef();
   const username = useRef();
   const password = useRef();
   const checkPassword = useRef();
   const email = useRef();
   const phone = useRef();
   const city = useRef();
   const street = useRef();
   const number = useRef();


   const onSignUp = async (ev) => {
      const { formIsValid, errors: errorsMap } = handleValidation()
      setErrors(errorsMap);
      ev.preventDefault()
      let msg = {};
      try {
         if (formIsValid) {
            delete userToSign.checkPassword
            if (!userToSign._id) await dispatch(signup(userToSign))
            else {
               await dispatch(update(userToSign))
               msg = {
                  txt: "user was successfully updated",
                  type: "success",
               };
            }
            history.push('/')
         }
      } catch (err) {
         console.log('err: cannot signup', err)
         if (userToSign._id) {
            msg = {
               txt: "Fail update user, try again later",
               type: "error",
            };
         }
      } finally {
         if (userToSign._id) {
            await dispatch(setUserMsg(msg))
         }
      }
   }

   return (
      <form className="form-signup" onSubmit={onSignUp}>
         <section className="part1">
            <h1 className="sub-title">פרטים אישיים:</h1>
            <section className="double-in-line">
               <label><span className="valid">* </span> שם פרטי:
                  <span className="valid"> {errors["fname"]}</span>

                  <Input type="text" ref={fname} name="fname" value={userToSign.fname}
                     onChange={() => { handleChange(fname) }}  />
               </label>

               <label><span className="valid">* </span> שם משפחה:
                  <span className="valid"> {errors["lname"]}</span>
                  <Input type="text" ref={lname} name="lname" value={userToSign.lname}
                     onChange={() => { handleChange(lname) }}  />
               </label>
            </section>
            <label><span className="valid">* </span> שם משתמש:
               <span className="valid"> {errors["username"]}</span>
               <Input type="text" ref={username} name="username" value={userToSign.username}
                  onChange={() => { handleChange(username) }}  />
            </label>
            <section className="double-in-line">
               <label>{!loggedInUser && <span className="valid">* </span>} סיסמה:
                  <span className="valid"> {errors["password"]}</span>
                  <Input type="Password" ref={password} name="password" value={userToSign.password}
                     onChange={() => { handleChange(password) }}  />
               </label>
               <label>{!loggedInUser && <span className="valid">* </span>} אימות סיסמה:
                  <span className="valid"> {errors["checkPassword"]}</span>
                  <Input type="Password" ref={checkPassword} name="checkPassword" value={userToSign.checkPassword}
                     onChange={() => { handleChange(checkPassword) }}  />
               </label>
            </section>
            <label><span className="valid">* </span> אימייל:
               <span className="valid"> {errors["email"]}</span>
               <Input type="email" ref={email} name="email" value={userToSign.email}
                  onChange={() => { handleChange(email) }}  />
            </label>

            <label><span className="valid">* </span> טלפון:
               <span className="valid"> {errors["phone"]}</span>
               <Input type="tel" ref={phone} name="phone" value={userToSign.phone}
                  onChange={() => { handleChange(phone) }}  />
            </label>
         </section>
         <section className="part2">
            <h1 className="sub-title">כתובת:</h1>
            <label><span className="valid">* </span> עיר:
               <span className="valid"> {errors["city"]}</span>
               <Input type="text" ref={city} name="city" value={userToSign.addresses.city}
                  onChange={() => { handleChange(city) }}  />
            </label>
            <label><span className="valid">* </span> רחוב:
               <span className="valid"> {errors["street"]}</span>
               <Input type="text" ref={street} name="street" value={userToSign.addresses.street}
                  onChange={() => { handleChange(street) }}  />
            </label>
            <label><span className="valid">* </span> מספר בית:
               <span className="valid"> {errors["number"]}</span>
               <Input type="number" ref={number} name="number" value={userToSign.addresses.number}
                  onChange={() => { handleChange(number) }}  />
            </label>
            <Button type="primary" onClick={onSignUp}>{(!userToSign._id) ? 'הרשם' : 'שמור'}</Button>
         </section>
      </form>
   )
}