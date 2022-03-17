import React, { useEffect } from "react";
// * Packages
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// * Components
import Home from "./components/Home/index";
import NotFound from "./components/Not Found/index";
// * Containers
import Login from "./containers/auth/Login/index";
import Register from "./containers/auth/Register/index";
import "./App.css";
// * Store
import { authCheckState } from "./store/actions/index";

function App() {
  const token =
    useSelector((state: any) => state.auth.token) ||
    localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, [token, navigate]);
  React.useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);
  let route = !token ? (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
  return route;
}

export default App;
