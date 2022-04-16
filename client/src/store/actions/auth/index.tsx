import * as actionTypes from "../actionTypes";
import { AUTH_LOGIN, AUTH_REGISTER } from "../../../types/global";

export const successAuth = (data: any) => ({
  type: actionTypes.SUCCESS_AUTH,
  data: data,
});

export const failLogin = (error: any) => ({
  type: actionTypes.FAIL_AUTH_LOGIN,
  error: error,
});

export const failRegister = (error: any) => ({
  type: actionTypes.FAIL_AUTH_REGISTER,
  error: error,
});

export const authLogout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });

export const authLogoutSucceed = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const authCheckState = () => ({
  type: actionTypes.AUTH_CHECK_STATE,
});

export const addPayment = (data: any) => ({
  type: actionTypes.ADD_PAYMENT,
  data: data,
});

export const successAddPayment = (data: any) => ({
  type: actionTypes.SUCCESS_ADD_PAYMENT,
  data: data,
});

export const fetchProducts = () => ({
  type: actionTypes.FETCH_PRODUCTS,
});
export const successFetchProducts = (data: any) => ({
  type: actionTypes.SUCCESS_FETCH_PRODUCTS,
  data: data,
});

export const sendBid = (data: any) => ({
  type: actionTypes.SEND_BID,
  data: data,
});
export const successSendBid = (data: any) => ({
  type: actionTypes.SUCCESS_SEND_BID,
  data: data,
});

export const fetchProduct = (data: any) => ({
  type: actionTypes.FETCH_PRODUCT,
  data: data,
});
export const successFetchProduct = (data: any) => ({
  type: actionTypes.SUCCESS_FETCH_PRODUCT,
  data: data,
});

// export const checkAuthTimeout = (expirationTime: any) => ({
//   type: actionTypes.CHECK_AUTH_TIMEOUT,
//   expirationTime: expirationTime,
// });

// export const currentUser = () => ({
//   type: actionTypes.CURRENT_USER,
// });

// Mine Auth

export const authLogin = (data: AUTH_LOGIN) => ({
  type: actionTypes.AUTH_LOGIN,
  data: data,
});

export const authRegister = (data: AUTH_REGISTER) => ({
  type: actionTypes.AUTH_REGISTER,
  data: data,
});
