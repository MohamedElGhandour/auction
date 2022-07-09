import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  transactions: [],
  currencyAmount: null,
};

const successAddPayment = (state: any, action: any) => {
  localStorage.setItem("currencyAmount", action.data.currencyAmount);
  return {
    ...state,
    currencyAmount: action.data.currencyAmount,
    transactions: [action.data.transaction, ...state.transactions],
  };
};

const successFetchWallet = (state: any, action: any) => {
  localStorage.setItem("currencyAmount", action.data.currencyAmount);
  return {
    ...state,
    transactions: action.data.transactions,
    currencyAmount: action.data.currencyAmount,
  };
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SUCCESS_ADD_PAYMENT:
      return successAddPayment(state, action);
    case actionTypes.SUCCESS_FETCH_WALLET:
      return successFetchWallet(state, action);
    default:
      return state;
  }
};
export default reducer;
