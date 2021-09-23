import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader";
import { EditItem } from "./pages/EditItem";
import { Home } from "./pages/Home";
import { ItemsPage } from "./pages/ItemsPage";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { UserProfile } from "./pages/UserProfile";
import { MyOrder } from "./cmps/MyOrder";
import { useEffect, useState } from "react";
import { UserMsg } from "./cmps/UserMsg";
import facebook from '../src/assets/imgs/icon-facebook.svg'
import linkedin from '../src/assets/imgs/icon-linkedin.svg'
import orange from '../src/assets/imgs/1.gif'
import { useDispatch, useSelector } from "react-redux";
import { currItemToNull, loadItems } from "./store/actions/itemActions";
import { ItemDetail } from "./cmps/ItemDetail";

// export default function App() {
export const App = () => {
   const [isOrderOpen, setIsOrderOpen] = useState(false)
   const [isDarkScreen, setIsDarkScreen] = useState(false)
   const [isHomePage, setIsHomePage] = useState(false)
   const { currItem } = useSelector(state => state.itemModule)
   const dispatch = useDispatch();

   useEffect(() => {
      const setItems = async () => {
         dispatch(await loadItems());
      }
      setItems();
   }, [])

   useEffect(() => {
      setIsDarkScreen((currItem) ? true : false)
   }, [currItem])

   const toggleMyOrder = () => {
      setIsOrderOpen(!isOrderOpen);
      setIsDarkScreen(!isDarkScreen);
   }

   const closeDarkScreen = () => {
      setIsDarkScreen(false);
      setIsOrderOpen(false);
      dispatch(currItemToNull())
   }

   const openMedia = (url) => {
      window.open(url, '_blank');
   }
   return (
      <div className="App main-layout">
         <Router>
            {isDarkScreen && <div className="dark-screen" onClick={closeDarkScreen}></div>}
            <MyOrder isOpen={isOrderOpen} closeMyOrder={toggleMyOrder} />
            <div className="full">
               <AppHeader openMyOrder={toggleMyOrder} isHomePage={isHomePage} />
            </div>
            <main className={(isHomePage) ? 'FarmIn-app full' : 'FarmIn-app mb20 mt20'}>
               <Switch >
                  <Route path="/items/edit/:id?" component={EditItem} />
                  <Route path="/user/profile/:id?" component={UserProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/items" component={ItemsPage} />
                  <Route path="/" render={() => (<Home setToFullscreen={setIsHomePage} />)} />
               </Switch>
               <UserMsg />
            </main>
            {currItem && <ItemDetail item={currItem} />}
            <footer className="full">
               <div className="content">
                  <div className="left-side">
                     <span className="copy-right">Copyright by Dekel Livyani Ⓒ</span>
                     <div className="social-media">
                        <img className="icon-media" src={facebook}
                           onClick={() => openMedia('https://www.facebook.com/dekel.livyani/')} alt="" />
                        <img className="icon-media" src={linkedin}
                           onClick={() => openMedia('https://www.linkedin.com/in/dekel-livyani-3609b4219/')} alt="" />
                     </div>
                  </div>
                  <div className="middle-side">
                     <span> Want to get in touch? </span>
                     <span> Drop me a line! </span>
                     <span className="email">Dekelliv0@gmail.com</span>
                  </div>
               </div>
               <div className="right-side">
                  <img className="orange-gif" src={orange} alt="" />
               </div>
            </footer>
         </Router>
      </div >
   );
}