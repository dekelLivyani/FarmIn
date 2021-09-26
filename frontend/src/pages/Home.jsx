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
         {loggedInUser?.isAdmin && <Link className="add-item-btn" to="/items/edit">הוסף פריט</Link>}
         {!loggedInUser && <Link className="start-buy-btn" to="/items"
            onClick={onSignUpAsGuest} >התחל כאן</Link>}
         <div className="hero-container">
            <span className='txt-hero fruit'>פירות</span>
            <img className="hero" src={hero} alt="" />
            <span className='txt-hero vegetable'>וירקות</span>
            <span className='txt-hero fresh'>הכי טריים שיש</span>
         </div>
      </section>
   )
}