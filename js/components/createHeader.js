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
            <i class="fa fa-home" style="font-size:24px; color:#5D6AE0">
                <a href="/index.html" class="${pathname === "/index.html" ? "" : ""}"></a>
            </i>
            <i class="fas fa-user-alt ml-2" style="font-size:20px; color:#5D6AE0">
                <a href="/my-posts.html" class="${pathname === "/my-posts.html" ? "" : ""}"></a>
            </i>
            <li class="fas fa-door-open ml-2 p-8" style="font-size:20px; color:#5D6AE0"><button id="logout-btn"></button></li>
            <li class="p-8 mt-1 font-light text-white"><span>Hello 👋  ${userName}</span></li>
            `
            postDetail = `
            <li class="p-8">
                <a href="/create-post.html" class="font-regular ${pathname === "/create-post.html" ? "text-blue-600" : ""}">Create Post</a>
            </li>
            `
        }
        // profileDetails.innerHTML = `
        // <ul class="flex">
        //    ${profileLinks}
        // </ul>`
        profileActions.innerHTML = `
        <ul>
            ${navLink}
        </ul>
        `
        postDetails.innerHTML = `
        <ul class=" block p-2.5 w-full text-center text-sm text-white placeholder-white pl-10" style="background-image: url(/img/pattern.png)">
            ${postDetail}
        </ul>
        `
    }
}

export default createHeader;
