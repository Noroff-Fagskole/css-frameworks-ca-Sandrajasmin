import '/style.css'

import{clearMyStorage} from "./utils/storage";
import createHeader from "./components/createHeader";

createHeader();

const logOutBtn = document.querySelector("#logout-btn");
if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        console.log("I am clicked");
        clearMyStorage();
        window.location.replace("/index.html");
    })
}