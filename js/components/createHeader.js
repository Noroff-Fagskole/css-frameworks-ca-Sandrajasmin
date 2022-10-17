import {getMyUserName} from "../utils/storage";

function createHeader() {
    const {pathname} = document.location;
    const profileIcons = document.querySelector("#nav__links");
    const postDetails = document.querySelector("#publish__container");
    const profileName = document.querySelector("#profile-container");
    if (profileIcons, postDetails) {
        const userName = getMyUserName();
        let navLink;
        let postDetail;
        if (userName) {
            navLink = `
            <div class="flex items-center justify-between mt-5">
                <a href="/welcome.html">
                    <img src="/img/logo.png" alt="logo" />
                </a>
                <div>
                    <a href="/welcome.html" class="${pathname === "/welcome.html" ? "" : ""}">
                        <i class="fa fa-home" style="font-size: 24px; color: #5d6ae0"></i>
                    </a>
                    <a href="/my-post.html" class="${pathname === "/my-post.html" ? "" : ""}">
                        <i class="fas fa-user-alt ml-2" style="font-size: 20px; color: #5d6ae0"></i>
                    </a>
                    <button id="logout-btn">
                        <li class="fas fa-door-open ml-2" style="font-size:20px; color:#5D6AE0">
                    </button>
                </div>
            </div>
            <div class="">
                <div>
                    <span class="list-none font-light text-white " >Hello 👋  ${userName}</span>
                </div>
            </div>
            `
            postDetail = `
            
                <a href="/create-post.html" class="p-8 font-regular ${pathname === "/create-post.html" ? "" : ""}"><h1 class="">Hi ${userName}, What are you thinking about today?</h1><p>Create a new post</p></a>
            `
        }
        profileIcons.innerHTML = `
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

