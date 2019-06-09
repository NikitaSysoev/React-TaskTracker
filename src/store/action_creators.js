import * as ACT from './actions';

export function editTask(payload) {
  return {
    type: ACT.DATA_TASK_EDIT,
    payload
  };
}
export function updateTask(payload) {
  return {
    type: ACT.DATA_TASK_UPDATE,
    payload
  };
}
export function addTask(payload) {
  return {
    type: ACT.DATA_TASK_ADD,
    payload
  };
}
export function deleteTask(payload) {
  return {
    type: ACT.DATA_TASK_DELETE,
    payload
  };
}
