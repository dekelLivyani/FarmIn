import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader";
import { EditItem } from "./pages/EditItem";
import { Home } from "./pages/Home";
import { ItemsPage } from "./pages/ItemsPage";
import { Signup } from "./pages/Signup";
import { UserProfile } from "./pages/UserProfile";
import { MyOrder } from "./cmps/MyOrder";
import { useEffect, useState } from "react";
import { UserMsg } from "./cmps/UserMsg";
import { useDispatch, useSelector } from "react-redux";
import { currItemToNull, loadItems } from "./store/actions/itemActions";
import { ItemDetail } from "./cmps/ItemDetail";
import { Login } from "./cmps/Login";
import { Footer } from "./cmps/Footer";

export const App = () => {
   const [isOrderOpen, setIsOrderOpen] = useState(false)
   const [isDarkScreen, setIsDarkScreen] = useState(false)
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [isHomePage, setIsHomePage] = useState(false)
   const [isLoginOpen, setIsLoginOpen] = useState(false)

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
      setIsLoginOpen(false);
      setIsMenuOpen(false);
      dispatch(currItemToNull())
   }
   const openLogin = () => {
      setIsLoginOpen(true);
      setTimeout(() => {
         setIsDarkScreen(true);
      }, 10);
   }
   
   const setDarkScreen = (deff) => {
      setIsDarkScreen(deff);
   }  

   return (
      <div className="App main-layout">
         <Router>
            {isDarkScreen && <div className="dark-screen" onClick={closeDarkScreen}></div>}
            <MyOrder isOpen={isOrderOpen} closeMyOrder={toggleMyOrder} />
            <div className="full">
               <AppHeader openMyOrder={toggleMyOrder} isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen} setDarkScreen={setDarkScreen}
                  openLogin={openLogin} isHomePage={isHomePage} />
            </div>
            <main className={(isHomePage) ? 'FarmIn-app full' : 'FarmIn-app mb20 mt20'}>
               <Switch >
                  <Route path="/items/edit/:id?" component={EditItem} />
                  <Route path="/user/profile/:id?" component={UserProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/items" component={ItemsPage} />
                  <Route path="/" render={() => (<Home setToFullscreen={setIsHomePage} />)} />
               </Switch>
               <UserMsg />
            </main>
            {currItem && <ItemDetail item={currItem} />}
            {isLoginOpen && <Login close={closeDarkScreen} />}
            <Footer/>
         </Router>
      </div >
   );
}