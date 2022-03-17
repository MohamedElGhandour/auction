import { takeEvery, all } from "redux-saga/effects";
import {
  loginSaga,
  registerSaga,
  authLogoutSaga,
  fetchProducts,
} from "./auth/index";

import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_LOGIN, loginSaga),
    takeEvery(actionTypes.AUTH_REGISTER, registerSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
    takeEvery(actionTypes.FETCH_PRODUCTS, fetchProducts),
  ]);
}
