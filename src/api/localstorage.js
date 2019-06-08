function uploadState(key = 'tasks') {
  const string = localStorage.getItem(key);
  return JSON.parse(string);
}

function saveState(state, key = 'tasks') {
  const string = JSON.stringify(state);
  localStorage.setItem(key, string);
  return true;
}

function removeState(key = 'tasks') {
  localStorage.removeItem(key);
  return true;
}

export default { uploadState, saveState, removeState };
