import * as actionTypes from "../../actionTypes";

export const addPayment = (data: any) => ({
  type: actionTypes.ADD_PAYMENT,
  data: data,
});

export const successAddPayment = (data: any) => ({
  type: actionTypes.SUCCESS_ADD_PAYMENT,
  data: data,
});

export const fetchWallet = () => ({
  type: actionTypes.FETCH_WALLET,
});

export const successFetchWallet = (data: any) => ({
  type: actionTypes.SUCCESS_FETCH_WALLET,
  data: data,
});
