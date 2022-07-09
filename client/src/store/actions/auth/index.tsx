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

export const authLogin = (data: AUTH_LOGIN) => ({
  type: actionTypes.AUTH_LOGIN,
  data: data,
});

export const authRegister = (data: AUTH_REGISTER) => ({
  type: actionTypes.AUTH_REGISTER,
  data: data,
});
