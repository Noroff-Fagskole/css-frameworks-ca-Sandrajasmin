import {getMyUserName} from "../utils/storage";

function createHeader() {
    const {pathname} = document.location;
    const navBar = document.querySelector("#nav-bar");

    const userName = getMyUserName();
    console.log("userName: ", userName);

    let authLink = `<a href="/login.html" class="${pathname === "/signup.html" ? "text-blue-600" : ""}">LogIn</a>`;
    if (userName) {
        authLink = `<span>Hello 👋  ${userName}</span>`
    }
}

export default createHeader;


//EDIT!!!