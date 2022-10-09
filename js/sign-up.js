import '../style.css'

const contactForm = document.querySelector("#contact-form");

//First Name
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");

//Email
const email = document.querySelector("#email-address");
const emailError = document.querySelector("#emailError");
const emailNotValid = document.querySelector("#emailError2");
console.log(emailError);

//const email = document.querySelector("#email-address")
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

//confirm password
const confirmPassword = document.querySelector("#confirmPassword")
const passwordError1 = document.querySelector("#confirmPasswordError")
const passwordDontMatch = document.querySelector("#passwordDontNotMatch")


//error
const generalError = document.querySelector("#general-error")

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isFirstName = false;
    if (firstName.value.trim().length > 0){
        firstNameError.classList.add("hidden");
        isFirstName = true;
    } else {
        firstNameError.classList.remove("hidden");
    }
    let isEmail = false;
    //email error
    if (email.value.trim().length > 0) {
        emailError.classList.add("hidden");
        isEmail = true;
    } else {
        emailError.classList.remove("hidden");
    }
    let isValidEmail = false;
    //email not valid
    if (email.value.trim().length && emailValidator(email.value) === true) {
        emailNotValid.classList.add("hidden");
        isValidEmail = true;
    } else if (email.value.trim().length && emailValidator(email.value) !== true) {
        emailNotValid.classList.remove("hidden");
    }

    let isPassword = false;
    //password
    if (password.value.trim().length >= 8) {
        passwordError.classList.add("hidden");
        isPassword = true;
    } else {
        passwordError.classList.remove("hidden");
    }
    //confirm password
    let isConfirmPassword = false;
    if (confirmPassword.value.trim().length >= 8) {
        passwordError1.classList.add("hidden");
        isConfirmPassword = true;
    } else {
        passwordError1.classList.remove("hidden");
    }

    let isValidPasswordMatch = false;
    isValidPasswordMatch = passwordValidator(); // true // false

    let isFormValid = isFirstName &&
        isEmail &&
        isValidEmail &&
        isPassword &&
        isConfirmPassword &&
        isValidPasswordMatch;

    if (isFormValid) {
        console.log("Validation SUCCEEDED!!  🥳"); 

        const userData = {
            "name": firstName.value,
            "email": email.value,
            "password": password.value
        }

        const REGISTER_USER_URL_ENDPOINT = "https://nf-api.onrender.com/api/v1/social/auth/register";

        (async function signUp() {
            const response = await fetch(REGISTER_USER_URL_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("POST REQUEST SUCCEEDED!!  🥳 🤗🤗");
                return data;
            } else {
                const err = await response.json();
                const message = `An error occurred: ${err.message}`;
                console.log("POST REQUEST Failed!!  💩");
                throw new Error(message);
            }
        })().catch(err => {
            generalError.innerHTML = `Sorry, an error happened ${err.message}`
        });

    } else {
        console.log("Validation FAILED!! 💩");
    }
});

function emailValidator(email) {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
    if (email.match(regEx)) {
        return true;
    } else {
        return false;
    }
}

function passwordValidator() {
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (!passwordValue) {
        return false;
    }
    if (!confirmPasswordValue) {
        return false;
    }
    if (passwordValue !== confirmPasswordValue) {
        passwordDontMatch.classList.remove("hidden");
        return false;
    } else {
        passwordDontMatch.classList.add("hidden");
        return true;
    }
}
