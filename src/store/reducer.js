import { combineReducers } from 'redux';
import * as ACT from './actions';
import { FORM_ADD, FORM_EDIT } from '../lib/const';

function rootReducer(store, action) {
  switch (action.type) {
    case ACT.DATA_TASK_EDIT:
      return { ...store, ...action.payload };
    case ACT.DATA_TASK_ADD:
      return { ...store, ...action.payload };
    case ACT.DATA_TASK_DELETE:
      return { ...store, ...action.payload };
    case ACT.DATA_TASK_UPDATE:
      return { ...store, ...action.payload };
    case ACT.FORM_STATE_ADD:
      return { ...store, formState: FORM_ADD };
    case ACT.FORM_STATE_EDIT:
      return { ...store, formState: FORM_EDIT };
    default:
      return store;
  }
}
