import * as actionTypes from "../../actionTypes";

export const fetchProducts = () => ({
  type: actionTypes.FETCH_PRODUCTS,
});

export const searchProducts = (data: any) => ({
  type: actionTypes.SEARCH_PRODUCTS,
  data: data,
});

export const successSearchProducts = (data: any) => ({
  type: actionTypes.SUCCESS_SEARCH_PRODUCTS,
  data: data,
});

export const successFetchProducts = (data: any) => ({
  type: actionTypes.SUCCESS_FETCH_PRODUCTS,
  data: data,
});

export const sendBid = (data: any) => ({
  type: actionTypes.SEND_BID,
  data: data,
});

export const successSendBid = (data: any) => ({
  type: actionTypes.SUCCESS_SEND_BID,
  data: data,
});

export const fetchProduct = (data: any) => ({
  type: actionTypes.FETCH_PRODUCT,
  data: data,
});

export const successFetchProduct = (data: any) => ({
  type: actionTypes.SUCCESS_FETCH_PRODUCT,
  data: data,
});

export const fetchProfile = () => ({
  type: actionTypes.FETCH_PROFILE,
});

export const successFetchProfile = (data: any) => ({
  type: actionTypes.SUCCESS_FETCH_PROFILE,
  data: data,
});

export const updatePageCount = (data: number) => ({
  type: actionTypes.UPDATE_PAGE_COUNT,
  data: data,
});

export const uploadImage = (data: any) => ({
  type: actionTypes.UPLOAD_IMAGE,
  image: data,
});

export const createProduct = (data: any) => ({
  type: actionTypes.CREATE_PRODUCT,
  data: data,
});
