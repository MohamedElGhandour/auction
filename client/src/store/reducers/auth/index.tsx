import * as actionTypes from "../../actions/actionTypes";
// import cloneDeep from "lodash/cloneDeep";

const initialState = {
  name: null,
  id: null,
  token: null,
  email: null,
  avatar: null,
  errorLogin: null,
  errorRegister: null,
  currencyAmount: null,
  type: null,
  products: [],
  product: null,
};

const successAuth = (state: any, action: any) => {
  localStorage.setItem("name", action.data.account.name);
  localStorage.setItem("userId", action.data.account._id);
  localStorage.setItem("email", action.data.account.email);
  localStorage.setItem("token", action.data.token);
  localStorage.setItem("avatar", action.data.account.avatar);
  localStorage.setItem("currencyAmount", action.data.account.currencyAmount);
  localStorage.setItem("type", action.data.account.kind);

  return {
    ...state,
    name: action.data.account.name,
    id: action.data.account._id,
    email: action.data.account.email,
    token: action.data.token,
    avatar: action.data.account.avatar,
    currencyAmount: action.data.account.currencyAmount,
    type: action.data.account.kind,
  };
};

const failLogin = (state: any, action: any) => ({
  ...state,
  errorLogin: action.error.message,
});

const failRegister = (state: any, action: any) => ({
  ...state,
  errorRegister: action.error.message,
});

const successFetchProducts = (state: any, action: any) => ({
  ...state,
  products: action.data.products,
});

const successFetchProduct = (state: any, action: any) => ({
  ...state,
  product: { ...action.data.product, bids: action.data.bids },
});

const successAddPayment = (state: any, action: any) => {
  localStorage.setItem("currencyAmount", action.data.currencyAmount);
  return {
    ...state,
    currencyAmount: action.data.currencyAmount,
  };
};

const successSendBid = (state: any, action: any) => ({
  ...state,
  product: { ...action.data.product, bids: action.data.bids },
  currencyAmount: action.data.currencyAmount,
});

const authLogout = () => initialState;

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SUCCESS_AUTH:
      return successAuth(state, action);
    case actionTypes.FAIL_AUTH_LOGIN:
      return failLogin(state, action);
    case actionTypes.FAIL_AUTH_REGISTER:
      return failRegister(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout();
    case actionTypes.SUCCESS_FETCH_PRODUCTS:
      return successFetchProducts(state, action);
    case actionTypes.SUCCESS_FETCH_PRODUCT:
      return successFetchProduct(state, action);
    case actionTypes.SUCCESS_ADD_PAYMENT:
      return successAddPayment(state, action);
    case actionTypes.SUCCESS_SEND_BID:
      return successSendBid(state, action);
    default:
      return state;
  }
};
export default reducer;
