import * as ACT from './actions';

export const deleteMiddleware = store => next => action => {
	if (action.type === ACT.DATA_TASK_DELETE) {
		alert("Данные удалены!!!");
		// store.dispatch(ACT.DATA_TASK_UPDATE)
	}
	return next(action);
};