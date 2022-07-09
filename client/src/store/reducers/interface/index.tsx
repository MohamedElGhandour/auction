import * as actionTypes from "../../actions/actionTypes";
// import cloneDeep from "lodash/cloneDeep";

const initialState = {
  loading: {
    login: false,
    signup: false,
    search: false,
  },
  error: {},
};

const login = (state: any, action: any) => ({
  ...state,
  loading: {
    ...state.loading,
    login: action.loading,
  },
});

const signup = (state: any, action: any) => ({
  ...state,
  loading: {
    ...state.loading,
    signup: action.loading,
  },
});

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.LOADING_LOGIN:
      return login(state, action);
    case actionTypes.LOADING_SIGNUP:
      return signup(state, action);
    default:
      return state;
  }
};
export default reducer;
