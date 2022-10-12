import {getMyUserName} from "../utils/storage";

function createHeader() {
    const {pathname} = document.location;
    //const profileDetails = document.querySelector("#profile-details");
    const profileActions = document.querySelector("#nav__bar--icons");
    const postDetails = document.querySelector("#publish__container")
    if (profileActions, postDetails) {
        const userName = getMyUserName();
        //let profileLinks;
        let navLink;
        let postDetail;
        if (userName) {
            navLink = `
            <a href="/welcome.html" class="${pathname === "/welcome.html" ? "" : ""}">
              <i class="fa fa-home" style="font-size: 24px; color: #5d6ae0"></i>
            </a>
            <a href="/my-post.html" class="${pathname === "/my-post.html" ? "" : ""}">
              <i class="fas fa-user-alt ml-2" style="font-size: 20px; color: #5d6ae0"></i>
            </a>
            <button id="logout-btn">
                <li class="fas fa-door-open ml-2 mr-4" style="font-size:20px; color:#5D6AE0">
            </button>
            <span class="list-none font-light text-white" >Hello 👋  ${userName}</span>
            `
            postDetail = `
            <li class="p-8">
                <a href="/create-post.html" class="font-regular ${pathname === "/create-post.html" ? "text-blue-600" : ""}">Create Post</a>
            </li>
            `
        }
        profileActions.innerHTML = `
    
            ${navLink}
    
        `
        postDetails.innerHTML = `
        <ul class=" block p-2.5 rounded-md w-full text-center text-sm text-white placeholder-white pl-10" style="background-image: url(/img/pattern.png)">
            ${postDetail}
        </ul>
        `
    }
}

export default createHeader;
