import * as actionTypes from "../../actions/actionTypes";
// import cloneDeep from "lodash/cloneDeep";

const initialState = {
  name: null,
  id: null,
  token: null,
  email: null,
  avatar: null,
  errorLogin: null,
  errorSignup: null,
  products: [],
};

const successAuth = (state: any, action: any) => {
  localStorage.setItem("name", action.data.account.name);
  localStorage.setItem("userId", action.data.account._id);
  localStorage.setItem("email", action.data.account.email);
  localStorage.setItem("token", action.data.token);
  localStorage.setItem("avatar", action.data.account.avatar);
  localStorage.setItem("currencyAmount", action.data.account.currencyAmount);
  return {
    ...state,
    name: action.data.account.name,
    id: action.data.account._id,
    email: action.data.account.email,
    token: action.data.token,
    avatar: action.data.account.avatar,
  };
};

const failLogin = (state: any, action: any) => ({
  ...state,
  errorLogin: action.error.message,
});

const failSignup = (state: any, action: any) => ({
  ...state,
  errorSignup: action.error.message,
});

const successFetchProducts = (state: any, action: any) => ({
  ...state,
  products: action.data.products,
});

const authLogout = () => initialState;

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SUCCESS_AUTH:
      return successAuth(state, action);
    case actionTypes.FAIL_AUTH_LOGIN:
      return failLogin(state, action);
    case actionTypes.FAIL_AUTH_SIGNUP:
      return failSignup(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout();
    case actionTypes.SUCCESS_FETCH_PRODUCTS:
      return successFetchProducts(state, action);
    default:
      return state;
  }
};
export default reducer;
