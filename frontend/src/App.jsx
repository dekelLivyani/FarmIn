import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AppHeader } from "./cmps/AppHeader";
import { EditItem } from "./pages/EditItem";
import { Home } from "./pages/Home";
import { ItemsPage } from "./pages/ItemsPage";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { UserProfile } from "./pages/UserProfile";


export default function App() {
   return (
      <div className="App main-layout">
         <Router>
            <div className="full">
               <AppHeader />
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
            </main>
         </Router>
      </div>
   );
}