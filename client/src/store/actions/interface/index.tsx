import * as actionTypes from "../actionTypes";

export const loadingLogin = (loading: boolean) => ({
  type: actionTypes.LOADING_LOGIN,
  loading: loading,
});

export const loadingSignup = (loading: boolean) => ({
  type: actionTypes.LOADING_SIGNUP,
  loading: loading,
});

// export const loadingSearch = (loading: boolean) => ({
//   type: actionTypes.LOADING_SEARCH,
//   loading: loading,
// });
