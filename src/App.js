import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import "./styles/styles.scss";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getInitialData,
  isUserLoggedIn,
} from "./redux/actions";
import Orders from "./components/Orders/Orders";
import Products from "./components/Products/Products";
import Category from "./components/Category/Category";

function App(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, []);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/products">
          <Products />
        </PrivateRoute>
        <PrivateRoute exact path="/orders">
          <Orders />
        </PrivateRoute>
        <PrivateRoute exact path="/category">
          <Category />
        </PrivateRoute>
        <Route exact path="/login">
          <LogIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
