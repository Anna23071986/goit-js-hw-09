'use strict';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
form.addEventListener('input', toFillLocalStorage);
form.addEventListener('submit', toClearLocalStorage);

const { email, message } = loadFromLS(localStorageKey) || {};
form.elements.message.value = message || '';
form.elements.email.value = email || '';

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
  const loadedStr = localStorage.getItem(key);

  try {
    const savedObject = JSON.parse(loadedStr);
    return savedObject;
  } catch {
    return loadedStr;
  }
}

function toFillLocalStorage() {
  const userEmail = form.elements.email.value;
  const userMessage = form.elements.message.value;

  const formValues = {
    email: userEmail.trim(),
    message: userMessage.trim(),
  };

  saveToLS(localStorageKey, formValues);
}

function toClearLocalStorage(e) {
  e.preventDefault();

  const { email, message } = loadFromLS(localStorageKey) || {};
  if (message && email) {
    console.log({ email, message });

    localStorage.removeItem(localStorageKey);
    form.reset();
  }
}

const input = document.querySelector('input');
input.addEventListener('focus', () => {
  input.placeholder = 'Type area';
});

input.addEventListener('blur', () => {
  input.placeholder = '';
});

// const parsedItem = JSON.parse(localStorage.getItem(localStorageKey));
// form.addEventListener('input', toFillLocalStorage);
// form.addEventListener('submit', toClearLocalStorage);

// const field = form.elements;
// field.message.value = parsedItem ? parsedItem.message : '';
// field.email.value = parsedItem ? parsedItem.email : '';

// function toFillLocalStorage() {
//   const formValues = {
//     email: field.email.value.trim(),
//     message: field.message.value.trim(),
//   };

//   localStorage.setItem(localStorageKey, JSON.stringify(formValues));
// }

// function toClearLocalStorage(e) {
//   e.preventDefault();
//   if (field.message.value !== '' && field.email.value !== '') {
//     console.log({
//       email: field.email.value.trim(),
//       message: field.message.value.trim(),
//     });
//     localStorage.removeItem(localStorageKey);
//     form.reset();
//   }
// }
