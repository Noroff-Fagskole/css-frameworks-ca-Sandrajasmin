import {getMyUserName} from "../utils/storage";

function createHeader() {
    const {pathname} = document.location;
    const navBar = document.querySelector("#nav-bar");

    const userName = getMyUserName();
    console.log("userName: ", userName);

    
}

export default createHeader;


//EDIT!!!