import { SET_URL_LIST, DELETE_URL_LIST } from '../type';

export const setUrlList = urlList => ({
  type: SET_URL_LIST,
  payload: urlList,
});

export const deleteUrlList = urlList => ({
  type: DELETE_URL_LIST,
  payload: urlList,
});
