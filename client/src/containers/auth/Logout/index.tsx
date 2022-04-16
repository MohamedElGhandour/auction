import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { authLogout } from "../../../store/actions/index";

const Logout = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(authLogout());
  }, [dispatch]);
  return <Navigate to="/login" />;
};
export default Logout;
