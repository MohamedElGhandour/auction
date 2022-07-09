import {
  put,
  // delay
  call,
  all,
  select,
} from "redux-saga/effects";
import * as actions from "../../../actions/index";
import { ResponseGenerator } from "../../../../types/global";

const server =
  process.env.NODE_ENV === "production"
    ? "https://auction-app-ghandour.herokuapp.com"
    : "http://localhost:4000";

export function* fetchProductsSaga() {
  const getPage = (state) => state.products.page;
  const page = yield select(getPage);
  // yield page < 2 && put(actions.loadingFetchPosts(true));
  const url: string = yield `${server}/api/product/?count=${8}&page=${page}`;
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
    yield put(actions.successFetchProducts(res));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchProductSaga(action: any) {
  const id = action.data;
  const url: string = yield `${server}/api/product/${id}`;
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
    yield put(actions.successFetchProduct(res));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export function* searchProductsSaga(action: any) {
  const data = { name: action.data };
  const getPage = (state) => state.products.page;
  const page = yield select(getPage);
  const url: string =
    yield `${server}/api/product/search?count=${8}&page=${page}`;
  const token: string = yield localStorage.getItem("token");
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
    yield put(actions.successSearchProducts(res));
  } catch (error) {
    console.log(error);
  }
}

export function* uploadImageSaga(image) {
  const data = new FormData();
  data.append("upload_preset", "auction-system");
  data.append("file", image);
  data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_KEY);
  try {
    const response = yield fetch(process.env.REACT_APP_CLOUDINARY_API_URL, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: data, // body data type must match "Content-Type" header
    });
    const res = yield response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export function* createProductSage(action) {
  let data = action.data;
  const images = yield all(
    data.images.map((image) => {
      return call(uploadImageSaga, image);
    })
  );
  for (let index = 0; index < data.images.length; index++) {
    data.images[index] = { image: images[index].secure_url };
  }
  const url: string = yield `${server}/api/product/`;
  const token: string = yield localStorage.getItem("token");
  try {
    const response = yield fetch(url, {
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
    const res = yield response.json();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

export function* sendBidSaga(action: any) {
  let url: string = yield `${server}/api/bid/`;
  const data = {
    product: action.data.product,
    price: action.data.price,
  };
  const token: string = yield localStorage.getItem("token");

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
    yield put(actions.successSendBid(res));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchProfileSaga() {
  console.log("fetchProfileSaga");
  const getPage = (state) => state.products.page;
  const page = yield select(getPage);
  const url: string =
    yield `${server}/api/user/profile?count=${8}&page=${page}`;
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
    yield put(actions.successFetchProfile(res));
  } catch (error) {
    console.log(error);
  }
}
