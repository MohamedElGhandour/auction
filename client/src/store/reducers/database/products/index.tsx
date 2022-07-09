import * as actionTypes from "../../../actions/actionTypes";

const initialState = {
  currencyAmount: null,
  products: [],
  search: [],
  product: null,
  pageMain: 1,
  pageProfile: 1,
  pageSearch: 1,
  count: 10,
  profile: {
    name: null,
    id: null,
    email: null,
    avatar: null,
    currencyAmount: null,
    type: null,
  },
  profileProducts: [],
};

const successFetchProducts = (state: any, action: any) => ({
  ...state,
  products: action.data.products,
  product: null,
  count: Math.ceil(action.data.countProducts / 8),
});

const successFetchProfile = (state: any, action: any) => {
  console.log(action);
  return {
    ...state,
    profile: {
      name: action.data.profile.name,
      id: action.data.profile._id,
      email: action.data.profile.email,
      avatar: action.data.profile.avatar,
      currencyAmount: action.data.profile.currencyAmount,
      type: action.data.profile.kind,
    },
    profileProducts: action.data.products,
    product: null,
    count: Math.ceil(action.data.countProducts / 8),
  };
};

const successSearchProducts = (state: any, action: any) => ({
  ...state,
  search: action.data.products,
  product: null,
  count: Math.ceil(action.data.countProducts / 8),
});

const successFetchProduct = (state: any, action: any) => ({
  ...state,
  product: { ...action.data.product, bids: action.data.bids },
});

const successSendBid = (state: any, action: any) => {
  localStorage.setItem("currencyAmount", action.data.currencyAmount);
  return {
    ...state,
    product: { ...action.data.product, bids: action.data.bids },
    currencyAmount: action.data.currencyAmount,
  };
};

const updatePageCount = (state: any, action: any) => ({
  ...state,
  page: action.data,
});

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SUCCESS_FETCH_PRODUCTS:
      return successFetchProducts(state, action);
    case actionTypes.SUCCESS_FETCH_PRODUCT:
      return successFetchProduct(state, action);
    case actionTypes.SUCCESS_SEND_BID:
      return successSendBid(state, action);
    case actionTypes.UPDATE_PAGE_COUNT:
      return updatePageCount(state, action);
    case actionTypes.SUCCESS_SEARCH_PRODUCTS:
      return successSearchProducts(state, action);
    case actionTypes.SUCCESS_FETCH_PROFILE:
      return successFetchProfile(state, action);
    default:
      return state;
  }
};
export default reducer;
