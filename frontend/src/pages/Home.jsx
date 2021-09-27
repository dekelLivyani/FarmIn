import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import hero from '../assets/imgs/hero.png'
import { signupAsGuest } from "../store/actions/userActions"


export const Home = ({ setToFullscreen }) => {
   const { loggedInUser } = useSelector(state => state.userModule)
   const dispatch = useDispatch()

   useEffect(() => {
      setToFullscreen(true)
      return () => {
         setToFullscreen(false)
      }
   }, [])

   const onSignUpAsGuest = () => {
      dispatch(signupAsGuest())
   }

   return (
      <section className="home-page full">
         <div className="hero-container">
            <img className="hero" src={hero} alt="" />
            <section className="hero-title">
               <section className="food-container">
                  <span className='txt-hero fruit'>פירות</span>
                  <span className='txt-hero vegetable'>וירקות</span>
               </section>
               <p className='txt-hero fresh'>הכי טריים שיש</p>
            </section>
         </div>

         {loggedInUser?.isAdmin &&
            <section className="add-item-container">
            <Link className="add-item-btn" to="/items/edit">הוסף פריט</Link>
            </section>
         }
         
         {!loggedInUser && <section className="start-here-container">
            <Link className="start-here-btn" to="/items"
               onClick={onSignUpAsGuest} >התחל כאן</Link>
            {/* <span>f</span> */}
         </section>}
      </section>
   )
}