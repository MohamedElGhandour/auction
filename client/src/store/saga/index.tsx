import { takeEvery, all } from "redux-saga/effects";

import { addPaymentSaga, fetchWalletSaga } from "./database/wallet/index";

import {
  loginSaga,
  registerSaga,
  authLogoutSaga,
  authCheckStateSaga,
} from "./auth/index";

import {
  fetchProductsSaga,
  fetchProductSaga,
  sendBidSaga,
  uploadImageSaga,
  createProductSage,
  searchProductsSaga,
  fetchProfileSaga,
} from "./database/products/index";

import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_LOGIN, loginSaga),
    takeEvery(actionTypes.AUTH_REGISTER, registerSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchWallet() {
  yield all([
    takeEvery(actionTypes.ADD_PAYMENT, addPaymentSaga),
    takeEvery(actionTypes.FETCH_WALLET, fetchWalletSaga),
  ]);
}

export function* watchProducts() {
  yield all([
    takeEvery(actionTypes.FETCH_PRODUCTS, fetchProductsSaga),
    takeEvery(actionTypes.FETCH_PRODUCT, fetchProductSaga),
    takeEvery(actionTypes.SEARCH_PRODUCTS, searchProductsSaga),
    takeEvery(actionTypes.UPLOAD_IMAGE, uploadImageSaga),
    takeEvery(actionTypes.CREATE_PRODUCT, createProductSage),
    takeEvery(actionTypes.SEND_BID, sendBidSaga),
    takeEvery(actionTypes.FETCH_PROFILE, fetchProfileSaga),
  ]);
}
