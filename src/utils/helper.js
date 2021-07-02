export const getItemFromStorage = (key) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setItemInStorage = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data));
};

export const removeItemFromStorage = (name) => {
  window.localStorage.removeItem(name);
};

export const getSentenceFromCamelCase = (message) => {
  const pattern = /[A-Za-z]/g;
  const messages = message.match(pattern);
  let errorMessage = '';
  for (let i = 0; i < messages.length; i++) {
    errorMessage +=
      messages[i] === messages[i].toUpperCase()
        ? ` ${messages[i].toLowerCase()}`
        : messages[i];
  }
  return errorMessage.trim();
};

export const getRegExp = (type) => {
  let regex = null;
  switch (type) {
    case 'email':
      regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
      break;
    case 'number':
      regex = /^[0-9]*$/;
      break;
    case 'password':
      regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      break;
    default:
      break;
  }
  return regex;
};

export const checkValidation = (errors, data) => {
  const finalErrors = {};
  Object.keys(data).forEach((key) => {
    if (data[key] === '' || data[key] === null || data[key] === {}) {
      finalErrors[key] = `Please enter ${getSentenceFromCamelCase(key)}.`;
    }
  });
  Object.keys(errors).forEach((key) => {
    if (errors[key] !== '') {
      finalErrors[key] = errors[key];
    }
  });
  return finalErrors;
};
