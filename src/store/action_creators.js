import * as ACT from './actions';

export function editTask(payload) {
  const taskList = payload.taskList.map(item =>
    item.id === payload.taskForEdit ? payload.newItem : item
  );
  localStorage.setItem('TASKS', JSON.stringify(taskList));
  return {
    type: ACT.DATA_TASK_EDIT,
    payload: { taskList }
  };
}

export function updateTask(payload) {
  return {
    type: ACT.DATA_TASK_UPDATE,
    payload
  };
}

export function addTask(payload) {
  const taskList = payload.taskList.concat(payload.newItem);
  localStorage.setItem('TASKS', JSON.stringify(taskList));
  return {
    type: ACT.DATA_TASK_ADD,
    payload: { taskList }
  };
}

export function deleteTask(payload) {
  const taskList = payload.taskList.filter(item => item.id !== payload.taskId);
  localStorage.setItem('TASKS', JSON.stringify(taskList));
  return {
    type: ACT.DATA_TASK_DELETE,
    payload: { taskList }
  };
}

export function setFormState(payload) {
  return {
    type: ACT.FORM_STATE_SET,
    payload
  };
}
