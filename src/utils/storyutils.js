const parseLocalStorageWithDefaultValue = (key,alt) => JSON.parse(localStorage.getItem(key) || JSON.stringify(alt));
const saveLocalStorage = (key,value) => {
  console.log(">saveLocalStorage=", value);
  localStorage.setItem(key, JSON.stringify(value));
};
export {
  parseLocalStorageWithDefaultValue,
  saveLocalStorage
};