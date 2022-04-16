import { takeEvery, all } from "redux-saga/effects";
import {
  loginSaga,
  registerSaga,
  authLogoutSaga,
  fetchProducts,
  authCheckStateSaga,
  addPaymentSaga,
  fetchProduct,
  sendBid,
} from "./auth/index";

import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_LOGIN, loginSaga),
    takeEvery(actionTypes.AUTH_REGISTER, registerSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
    takeEvery(actionTypes.FETCH_PRODUCTS, fetchProducts),
    takeEvery(actionTypes.FETCH_PRODUCT, fetchProduct),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    takeEvery(actionTypes.ADD_PAYMENT, addPaymentSaga),
    takeEvery(actionTypes.SEND_BID, sendBid),
  ]);
}
