export function getDataFromStorage(key) {
  const string = localStorage.getItem(key);
  return JSON.parse(string);
}

export function setDataToStorage(key, data) {
  const string = JSON.stringify(data);
  localStorage.setItem(key, string);
}

export function deleteItemFromStorage(key) {
  localStorage.delete(key);
}

export function clearStorage() {
  localStorage.clear();
}
