import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as ACT from './actions';
import { FORM_ADD } from '../lib/const';

const initialState = {
  // GLOBAL STORE - первичная инициализация, т.е. как выглядит стор на этапе первого рендера прилаги
  taskList: [], // можно добавлять сюда столько полей, сколько вам нужно для работы приложения
  taskId: null, // id задачи (индекс в массиве), которая находится в режиме редактирования
  formState: FORM_ADD // состояние формы ADD / EDIT
};

function rootReducer(store = initialState, action) {
  switch (action.type) {
    case ACT.DATA_TASK_EDIT:
      return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

    case ACT.DATA_TASK_ADD:
      return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

    case ACT.DATA_TASK_DELETE:
      return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

    case ACT.DATA_TASK_UPDATE:
      return { ...store, ...action.payload }; // новый объект STORE (GLOBAL REDUX STORE)

    default:
      return store;
  }
}

export default history =>
  combineReducers({
    router: connectRouter(history),
    app: rootReducer
  });
