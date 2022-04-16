import React, { useEffect } from "react";
// * Packages
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// * Components
import Home from "./components/Home/index";
// import NotFound from "./components/Not Found/index";
import Success from "./components/Success/index";

// * Containers
import Login from "./containers/auth/Login/index";
import Logout from "./containers/auth/Logout/index";
import Register from "./containers/auth/Register/index";
import Wallet from "./containers/wallet/index";
import Layout from "./layout/index";
import Product from "./containers/product/index";

import "./App.css";
// * Store
import { authCheckState } from "./store/actions/index";

function App() {
  const token =
    useSelector((state: any) => state.auth.token) ||
    localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);
  let route = (
    <Routes>
      {!token && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      {token && (
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product">
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="wallet" element={<Wallet />} />
            <Route path="success" element={<Success />} />
            <Route path="logout" element={<Logout />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Route>
        </>
      )}
      <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
    </Routes>
  );
  return route;
}

export default App;
