import { USER_LOGIN_URL } from './settings/api';
import { emailValidator } from './utils/validation';
import { saveMyUser, saveMyToken } from './utils/storage';

const signInForm = document.querySelector('#signIn__form');

//email error
const email = document.querySelector('#email-address');
const emailError = document.querySelector('#emailError');
const emailNotValid = document.querySelector('#emailNotValid');

//password errorl
const password = document.querySelector('#password');
const passwordError = document.querySelector('#passwordError');

//general error
const generalError = document.querySelector('#general-error');

if (signInForm) {
  signInForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let isEmail = false;
    if (email.value.trim().length > 0) {
      emailError.classList.add('hidden');
      isEmail = true;
    } else {
      emailError.classList.remove('hidden');
    }

    let isValidEmail = false;
    if (email.value.trim().length && emailValidator(email.value) === true) {
      emailNotValid.classList.add('hidden');
      isValidEmail = true;
    } else if (
      email.value.trim().length &&
      emailValidator(email.value) !== true
    ) {
      emailNotValid.classList.remove('hidden');
    }

    let isPassword = false;

    if (password.value.trim().length >= 8) {
      passwordError.classList.add('hidden');
      isPassword = true;
    } else {
      passwordError.classList.remove('hidden');
    }

    let isFormValid = isEmail && isValidEmail && isPassword;

    if (isFormValid) {
      console.log('Validation SUCCEEDED!!  🥳');
      const userData = {
        email: email.value,
        password: password.value,
      };

      const LOGIN_USER_URL_ENDPOINT = `${USER_LOGIN_URL}`;

      (async function logInUser() {
        const response = await fetch(LOGIN_USER_URL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);
          console.log(data.accessToken);
          // save Token
          saveMyToken(data.accessToken);
          // save user
          const userToSave = {
            name: data.name,
            email: data.email,
          };
          console.log(userToSave);
          saveMyUser(userToSave);
          console.log('POST REQUEST LOGIN SUCCEEDED!!  🥳 🤗🤗');
          location.href = '/welcome.html';
        } else {
          const err = await response.json();
          const message = `An error occurred: ${err.message}`;
          console.log('POST REQUEST LOGIN Failed!!  💩');
          throw new Error(message);
        }
      })().catch((err) => {
        generalError.innerHTML = `Sorry !! ${err.message}`;
      });
    } else {
      console.log('Validation FAILED!! 💩');
    }
  });
}
