import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader";
import { EditItem } from "./pages/EditItem";
import { Home } from "./pages/Home";
import { ItemsPage } from "./pages/ItemsPage";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { UserProfile } from "./pages/UserProfile";
import { MyOrder } from "./cmps/MyOrder";
import { useState } from "react";
import { UserMsg } from "./cmps/UserMsg";


export default function App() {
   const [isOrderOpen, setIsOrderOpen] = useState(false)
   const [isDarkScreen, setIsDarkScreen] = useState(false)

   const toggleMyOrder = () => {
      setIsOrderOpen(!isOrderOpen);
      setIsDarkScreen(!isDarkScreen);
   }

   return (
      <div className="App main-layout">
         <Router>
         {isDarkScreen && <div className="dark-screen" onClick={toggleMyOrder}></div>}
         <MyOrder isOpen={isOrderOpen} closeMyOrder={toggleMyOrder}/>
            <div className="full">
               <AppHeader openMyOrder={toggleMyOrder} />
            </div>
            <main className="FarmIn-app">
               <Switch>
                  <Route path="/items/edit/:id?" component={EditItem} />
                  <Route path="/user/profile/:id?" component={UserProfile} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/items" component={ItemsPage} />
                  <Route path="/" component={Home} />
               </Switch>
               <UserMsg/>
            </main>
         </Router>
      </div>
   );
}