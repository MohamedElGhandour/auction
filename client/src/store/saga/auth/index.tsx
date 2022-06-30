import {
  put,
  // delay
  call,
  all,
} from "redux-saga/effects";
import * as actions from "../../actions/index";
import { ResponseGenerator } from "../../../types/global";

const server =
  process.env.NODE_ENV === "production"
    ? "https://auction-app-ghandour.herokuapp.com"
    : "http://localhost:4000";

export function* loginSaga(action: any) {
  let url: string = yield `${server}/api/auth/login`;
  const data = {
    email: action.data.email,
    password: action.data.password,
  };
  yield put(actions.loadingLogin(true));
  try {
    const response: ResponseGenerator = yield fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res: ResponseGenerator = yield response.json();
    if (res.statusText === "FAILED") throw res;
    yield put(actions.loadingLogin(false));

    yield put(actions.successAuth(res));
  } catch (error) {
    yield put(actions.loadingLogin(false));
    yield put(actions.failLogin(error));
    console.log(error);
  }
}

// export function* fetchPostsSaga() {
//   const getPage = (state) => state.posts.page;
//   const page = yield select(getPage);
//   yield page < 2 && put(actions.loadingFetchPosts(true));
//   const token = yield localStorage.getItem("token");
//   const url = `${server}/api/posts?count=${10}&page=${page}`;
//   try {
//     const response = yield fetch(url, {
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//     // 'Content-Type': 'application/x-www-form-urlencoded',
//   },
// });
//     const res = yield response.json();
//     // yield delay(1000);
//     if (res.status === "FAILED") throw res;
//     yield put(actions.loadingFetchPosts(false));
//     yield put(actions.successFetchPosts(res.data));
//   } catch (error) {
//     yield console.log(error);
//     yield put(actions.loadingFetchPosts(false));
//     yield put(actions.failFetchPosts(error));
//   }
// }

export function* sendBid(action: any) {
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

export function* fetchProducts() {
  const url: string = yield `${server}/api/product/`;
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

export function* fetchProduct(action: any) {
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

export function* registerSaga(action: any) {
  let url: string = yield `${server}/api/auth/register`;
  const data = {
    name: action.data.name,
    email: action.data.email,
    password: action.data.password,
    type: action.data.type,
  };
  yield put(actions.loadingSignup(true));
  try {
    const response: ResponseGenerator = yield fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const res: ResponseGenerator = yield response.json();
    if (res.statusText === "FAILED") throw res;
    yield put(actions.loadingSignup(false));
    console.log(res);
    yield put(actions.successAuth(res));
  } catch (error) {
    yield put(actions.loadingSignup(false));
    yield put(actions.failRegister(error));
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

// export function* loginSaga(action: any) {
//   let url: string = yield `${server}/api/auth/login`;
//   const data = {
//     email: action.data.email,
//     password: action.data.password,
//   };
//   console.log(data);
//   //     yield put(actions.loadingLogin(true));
//   try {
//     const response: ResponseGenerator = yield fetch(url, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       mode: "cors", // no-cors, *cors, same-origin
//       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: "same-origin", // include, *same-origin, omit
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: "follow", // manual, *follow, error
//       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     });
//     const res: ResponseGenerator = yield response.json();
//     console.log(res);

//     // if (res.status === "FAILED") throw res;
//     // const expirationDate = yield new Date(res.expiresIn * 1000);
//     // yield localStorage.setItem("name", res.data.name);
//     // yield localStorage.setItem("userId", res.data._id);
//     // yield localStorage.setItem("email", res.data.email);
//     // yield localStorage.setItem("token", res.access_token);
//     // yield localStorage.setItem("avatar", res.data.avatar);
//     // yield localStorage.setItem("cover", res.data.cover);
//     // yield localStorage.setItem("followers", JSON.stringify(res.data.followers));
//     // yield localStorage.setItem("requests", JSON.stringify(res.data.requests));
//     // yield localStorage.setItem("following", JSON.stringify(res.data.following));
//     // yield localStorage.setItem("pending", JSON.stringify(res.data.pending));
//     // yield localStorage.setItem("expirationDate", expirationDate);
//     // yield delay(5000)
//     // yield put(
//     //   actions.checkAuthTimeout(
//     //     (new Date(expirationDate).getTime() - new Date().getTime()) / 1000
//     //   )
//     // );
//     // action.data.isSignUp
//     //   ? yield put(actions.loadingSignup(false))
//     //   : yield put(actions.loadingLogin(false));
//     // yield put(actions.successAuth(res));
//   } catch (error) {
//     console.log(error);

//     // action.data.isSignUp
//     //   ? yield put(actions.failSignup(error))
//     //   : yield put(actions.failAuth(error));
//     // action.data.isSignUp
//     //   ? yield put(actions.loadingSignup(false))
//     //   : yield put(actions.loadingLogin(false));
//   }
// }

export function* authLogoutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("avatar");
  yield localStorage.removeItem("name");
  yield localStorage.removeItem("email");
  yield put(actions.authLogoutSucceed());
}

// export function* checkAuthTimeoutSaga(action: any) {
//   yield delay(action.expirationTime * 1000);
//   yield put(actions.authLogout());
// }

export function* authCheckStateSaga() {
  const token: string = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const _id: string = yield localStorage.getItem("userId");
    const avatar: string = yield localStorage.getItem("avatar");
    const name: string = yield localStorage.getItem("name");
    const email: string = yield localStorage.getItem("email");
    const currencyAmount: string = yield localStorage.getItem("currencyAmount");
    const kind: string = yield localStorage.getItem("type");

    const data = {
      name,
      _id,
      email,
      avatar,
      currencyAmount,
      kind,
    };
    yield put(actions.successAuth({ account: data, token }));
  }
}

// export function* fetchCurrentUser() {
//   const token = yield localStorage.getItem("token");
//   try {
//     const response = yield fetch(`${server}/api/current_user`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const res = yield response.json();
//     yield localStorage.setItem("name", res.data[0].name);
//     yield localStorage.setItem("userId", res.data[0]._id);
//     yield localStorage.setItem("email", res.data[0].email);
//     yield localStorage.setItem("avatar", res.data[0].avatar);
//     yield localStorage.setItem("cover", res.data[0].cover);
//     yield localStorage.setItem(
//       "followers",
//       JSON.stringify(res.data[0].followers)
//     );
//     yield localStorage.setItem(
//       "requests",
//       JSON.stringify(res.data[0].requests)
//     );
//     yield localStorage.setItem(
//       "following",
//       JSON.stringify(res.data[0].following)
//     );
//     yield localStorage.setItem("pending", JSON.stringify(res.data[0].pending));
//     const data = {
//       name: res.data[0].name,
//       userId: res.data[0]._id,
//       email: res.data[0].email,
//       token: token,
//       avatar: res.data[0].avatar,
//       cover: res.data[0].cover,
//       followers: res.data[0].followers,
//       requests: res.data[0].requests,
//       following: res.data[0].following,
//       pending: res.data[0].pending,
//     };
//     yield put(actions.successAuth({ data: data }));
//   } catch (error) {
//     // yield console.log(error);
//     yield put(actions.failFetchPosts(error));
//   }
// }
