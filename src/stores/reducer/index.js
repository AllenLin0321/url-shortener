import { combineReducers } from 'redux';
import { SET_URL_LIST, DELETE_URL_LIST } from '../type';

const initialState = [
  {
    originUrl: 'https://picsee.io/?utm_source=old_headline',
    picseeUrl: 'http://user22695.psee.io/SQDMT',
    imageUrl: 'https://picsee.io/_nuxt/img/logo-dark.89405c6.png',
  },
];

const urlListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_URL_LIST:
      return [...payload, ...state];

    case DELETE_URL_LIST:
      const newUrlList = state.filter(
        url => url.picseeUrl !== payload.picseeUrl
      );
      localStorage.setItem('url', JSON.stringify(newUrlList));
      return newUrlList;

    default:
      return state;
  }
};

export default combineReducers({ urlList: urlListReducer });
