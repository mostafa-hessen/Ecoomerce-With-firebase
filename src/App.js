import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import {
  BrowserRouter ,
  Switch,
  Route,
} from "react-router-dom";
 import Home from './component/home';
import User from './component/User';
import Cook from './component/cook';
import 'bootstrap/dist/css/bootstrap.min.css';
import Detailes from './component/detailes';
import MyCart from './component/MyCart';

function App() {
  return (
    <div className="App">


    <BrowserRouter>
      <Switch>
          <Route exact path="/user">
            <User />
          </Route>


          <Route exact path="/MyCart">
            <MyCart />
          </Route>

          <Route exact path="/">
            <Cook />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/detailes">
            <Detailes />
          </Route>

          
           
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
