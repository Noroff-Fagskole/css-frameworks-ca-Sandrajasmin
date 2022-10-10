import {USER_LOGIN_URL} from "./settings/api";
import {emailValidator} from "./utils/validation"
import {saveMyUser, saveMyToken } from './utils/storage';

const signInForm = document.querySelector("#signIn__form");

//email error
const email = document.querySelector("#email-address");
const emailError = document.querySelector("#emailError");
const emailNotValid = document.querySelector("#emailNotValid")

//password error
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

//general error
const generalError = document.querySelector("#general-error");

if(signInForm) {
    signInForm.addEventListener("submit", function (event) {
        event.preventDefault();

        //Error for not entered email
        let isEmail = false;
        if (email.value.trim().lenght > 0) {
            emailError.classList.add("hidden");
            isEmail = true;
        } else {
            emailError.classList.remove("hidden");
        }

        //Error for not valid email
        let isValidEmail = false;
        if (email.value.trim().lenght && emailValidator(email.value) === true) {
            emailNotValid.classList.add("hidden");
            isValidEmail = true;
        } else if(email.value.trim().lenght && emailValidator(email.value) !== true){
            emailNotValid.classList.remove("hidden");
        }
        
        //error for not valid password
        let isPassword = false;
        if (password.value.trim().lenght >= 8) {
            passwordError.classList.add("hidden");
            isPassword = true;
        } else {
            passwordError.classList.remove("hidden");
        }

        //form valid
        let ifFormIsValid = isEmail && isValidEmail && isPassword;
        if (ifFormIsValid) {
            console.log("validation succeeded");
            const userData = {
                "email": email.value,
                "password": password.value
            }

            const LOGIN_USER_URL_ENDPOINT = `${USER_LOGIN_URL}`

            (async function logInUser() {
                const response = await fetch (LOGIN_USER_URL_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                if (response.ok) {
                    const data = await response.json();
                    
                    console.log("Data: LOL", data);
                    console.log("AccessToken", data.accessToken);

                    //save token
                    saveMyToken(data.accessToken)
                    //save user
                    const userForSave = {
                        name: data.name,
                        email: data.email
                    }
                    console.log(userForSave);
                    saveMyUser(userForSave);
                    console.log("POST REQUEST LOGIN SUCCEEDED");
                    location.href = "/home.html"
                } else {
                    const err = await response.json();
                    const message = `An error occurred: ${err.massage}`;
                    console.log("post request login failed...");
                    throw new Error(message);
                }
            })().catch(err => {
                generalError.innerHTML = `Sorry !! ${err.message}`
            });
        } else {
            console.log("Validation FAILED!! 💩");
        }
    })
}