import { combineReducers } from 'redux';
import { SET_URL_LIST } from '../type';

const urlListReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_URL_LIST:
      return [...payload, ...state];

    default:
      return state;
  }
};

export default combineReducers({ urlList: urlListReducer });
