import {getMyUserName} from "../utils/storage";

function createHeader() {
    const {pathname} = document.location;
    //const profileDetails = document.querySelector("#profile-details");
    const profileIcons = document.querySelector("#nav__links");
    const postDetails = document.querySelector("#publish__container");
    const profileName = document.querySelector("#profile-container");
    if (profileIcons, postDetails) {
        const userName = getMyUserName();
        //let profileLinks;
        let userNick;
        let navLink;
        let postDetail;
        if (userName) {
            navLink = `
            <div class="flex items-center justify-between mt-5">
                <img src="/img/logo.png" alt="logo" />
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
                <form class="mt-2">   
                    <label for="default-search" class="mb-2 text-sm font-medium sr-only dark:text-gray-300">Search</label>
                    <div class="relative">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm bg-white rounded-md placeholder-lightblue" placeholder="Search content feed..." required>
                    </div>
                </form>
            </div>
            `
            postDetail = `
            <li class="p-8">
                <a href="/create-post.html" class="font-regular ${pathname === "/create-post.html" ? "" : ""}"><h1 class="">Hi ${userName}, What are you thinking about today?</h1><p>Create a new post</p></a>
            </li>
            `
            userNick = `
            <img
              class="max-w-min"
              src="/img/person1.png"
              alt="profile picture"
            />
            <h2 id="username" class="mt-6 mb-6">${userName}</h2>
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
        profileName.innerHTML = `
        ${userNick}
        `
    }
}

export default createHeader;
