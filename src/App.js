import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { getInitialData, isUserLoggedIn } from "./actions";
import "./App.css";
import PrivateRoute from "./components/HOC/PrivateRoute";
import Layout from "./components/Layout";
import AddCategory from "./containers/AddCategory";
import AddProduct from "./containers/AddProduct";
import Category from "./containers/Category";
import EditCategory from "./containers/EditCategory";
import EditProduct from "./containers/EditProduct";
import Home from "./containers/Home";
import OrderDetail from "./containers/OrderDetail";
import Orders from "./containers/Orders";
import Products from "./containers/Products";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import { io } from "socket.io-client";
import { domain } from "./urlConfig";
import { notifyConstants } from "./actions/constants";
import Labels from "./containers/Labels";
import EditLabel from "./containers/EditLabel";
import AddLabel from "./containers/AddLabel";

let socket;

export const initiateSocketConnection = () => {
  socket = io(domain);
};

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    } else {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if (auth.authenticate) {
      initiateSocketConnection();
      socket.on("notify admin", (notify) => {
        dispatch({
          type: notifyConstants.PUSH_NOTIFY,
          payload: { notify },
        });
      });
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/products" component={Products} />
          <PrivateRoute exact path="/orders" component={Orders} />
          <PrivateRoute exact path="/orders/:id" component={OrderDetail} />
          {auth && auth.user.role === "admin" && (
            <PrivateRoute exact path="/product/add" component={AddProduct} />
          )}
          <PrivateRoute exact path="/categories" component={Category} />
          {auth && auth.user.role === "admin" && (
            <PrivateRoute exact path="/category/add" component={AddCategory} />
          )}

          <PrivateRoute
            exact
            path="/category/edit/:id"
            component={EditCategory}
          />

          <PrivateRoute exact path="/labels" component={Labels} />
          {auth && auth.user.role === "admin" && (
            <PrivateRoute exact path="/label/add" component={AddLabel} />
          )}

          <PrivateRoute exact path="/label/edit/:id" component={EditLabel} />

          <PrivateRoute exact path="/product/:id" component={EditProduct} />

          <Route path="/signup" component={Signup} />
          {auth && auth.user.role === "staff" && <Redirect to="/products" />}
          <Route path="/signin" component={Signin} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
