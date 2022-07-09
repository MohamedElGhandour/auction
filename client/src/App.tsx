import React, { useEffect } from "react";
// * Packages
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// * Components
// import NotFound from "./components/Not Found/index";
import Success from "./components/Success/index";
import Page from "./layout/Page/index";

// * Containers
import Home from "./containers/Home/index";
import Login from "./containers/auth/Login/index";
import Logout from "./containers/auth/Logout/index";
import Register from "./containers/auth/Register/index";
import Wallet from "./containers/wallet/index";
import Layout from "./layout/index";
import GetProduct from "./containers/product/get/index";
import AddProduct from "./containers/product/add/index";
import Search from "./containers/Search/index";
import Profile from "./containers/Profile/index";

import "./App.css";
// * Store
import { authCheckState } from "./store/actions/index";

function App() {
  const token =
    useSelector((state: any) => state.auth.token) ||
    localStorage.getItem("token");
  const name =
    useSelector((state: any) => state.auth.name) ||
    localStorage.getItem("name");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);
  let route = (
    <Routes>
      {!token && (
        <>
          <Route
            path="/login"
            element={
              <Page title="Login">
                <Login />
              </Page>
            }
          />
          <Route
            path="/register"
            element={
              <Page title="Register">
                <Register />
              </Page>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
      {token && (
        <>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Page title="Home">
                  <Home />
                </Page>
              }
            />
            <Route
              path="profile"
              element={
                <Page title={name}>
                  <Profile />
                </Page>
              }
            />
            <Route path="product">
              <Route path=":id" element={<GetProduct />} />
              <Route
                path="add"
                element={
                  <Page title="Add Product">
                    <AddProduct />
                  </Page>
                }
              />
              <Route path="search" element={<Search />} />
            </Route>
            <Route
              path="wallet"
              element={
                <Page title="Wallet">
                  <Wallet />
                </Page>
              }
            />
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
