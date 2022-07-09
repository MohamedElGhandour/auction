import {
  put,
  // delay
  //   call,
  //   all,
  //   select,
} from "redux-saga/effects";
import * as actions from "../../../actions/index";
import { ResponseGenerator } from "../../../../types/global";

const server =
  process.env.NODE_ENV === "production"
    ? "https://auction-app-ghandour.herokuapp.com"
    : "http://localhost:4000";

export function* addPaymentSaga(action: any) {
  let url: string = yield `${server}/api/stripe/payment`;
  const token: string = yield localStorage.getItem("token");

  const data = {
    tokenId: action.data.tokenId,
    amount: action.data.amount,
  };
  try {
    const response: ResponseGenerator = yield fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res: ResponseGenerator = yield response.json();
    if (res.statusText === "FAILED") throw res;
    console.log(res);
    yield put(actions.successAddPayment(res));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchWalletSaga() {
  const url: string = yield `${server}/api/wallet/`;
  const token: string = yield localStorage.getItem("token");
  try {
    const response: ResponseGenerator = yield fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const res: ResponseGenerator = yield response.json();
    if (res.statusText === "FAILED") throw res;
    yield put(actions.successFetchWallet(res));
  } catch (error) {
    console.log(error);
  }
}
