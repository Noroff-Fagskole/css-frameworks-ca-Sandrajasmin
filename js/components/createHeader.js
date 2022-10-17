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



// import moment from "moment";
// import {SORT_ASC_URL, GET_POSTS_URL} from "./settings/api";
// import {getMyToken} from "./utils/storage";

// const blogPost = document.querySelector("#blog-post");
// const postsNotificationMessage = document.querySelector(".posts__notification")
// const postDetails = document.querySelector("#publish__container");
// let data = [];

// const accessToken = getMyToken();
// if(!accessToken){
//     location.href = "/login.html"
// }

// const searchBar = document.querySelector("#search");

// searchBar.addEventListener("keyup", (e) => {
//   const searchString = e.target.value.toLowerCase();
//   const filteredPosts = data.filter((post) => {
//     return post.title.toLowerCase().includes(searchString);
//   });
//   displayPost(filteredPosts);
// });

// async function getAllMyPosts() {
//     const response = await fetch(GET_POSTS_URL, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${accessToken}`
//         },
//     });
//     if (response.ok) {
//         data = await response.json();
//         showData(data)
//     } else {
//         const err = await response.json();
//         const messageErr = `Sorry some error ${err}`;
//     }
// };

// const showData = (data) => {
//     blogPost.innerHTML = "";
//     let now = moment(new Date());
//     if (!data.length) {
//         blogPost.innerHTML ="Sorry no posts today";
//     } else {
//         const listOfPosts = data.map((post) => {
//             const {body, title, created, id} = post;
//             const daysSinceCreated = now.diff(created, "day");

//             return `
//             <a href="/single-post.html?post_id=${id}" class="posts__container flex mb-6">
//                 <img class="post__container--img max-w-min" src="/img/person1.png" alt="profile picture" />
//                 <div class="post__container--text ml-6">
//                     <div class="flex flex-wrap">
//                         <h2 class="font-extraBold text-base mr-6">Kathy Holms</h2>
//                         <p class="font-light text-xs mt-1">${daysSinceCreated} d</p>
//                     </div>
//                     <p class="font-bold max-w-2xl mt-3">${title}</p>
//                     <p class="font-light max-w-2xl mt-1 mb-5">${body}</p>
//                 </div>
//             </a>
//             `;
//         }).join("");
//         blogPost.insertAdjacentHTML("beforeend", listOfPosts)
//     }
// };

// getAllMyPosts().then(() => {
//     showData(data);
// });

// const newestPostBTN = document.querySelector("#new-post-btn");
// const oldestPostBTN = document.querySelector("#old-post-btn");

// const postContainerAsc = document.querySelector("#postAsc-container");

// oldestPostBTN.addEventListener("click", () => {
//     getPostAsc();
// });

// const getPostAsc = async () => {
//     try {
//         const response = await fetch(SORT_ASC_URL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         if (response.ok) {
//             const postsAsc = await response.json();
//             let now = moment(new Date());
//             if (!postsAsc.length) {
//                 blogPost.innerHTML = "Sorry no post today!";
//             } else {
//                 const listOfPosts = postsAsc.map((postAsc) => {
//                     const {body, title, created, id} = postAsc;
//                     const daysSinceCreated = now.diff(created, "day");

//                     postContainerAsc.innerHTML += `
//                     <a href="/single-post.html?post_id=${id}" class="posts__container flex mb-6">
//                         <img class="post__container--img max-w-min" src="/img/person1.png" alt="profile picture" />
//                         <div class="post__container--text ml-6">
//                             <div class="flex flex-wrap">
//                                 <h2 class="font-extraBold text-base mr-6">Kathy Holms</h2>
//                                 <p class="font-light text-xs mt-1">${daysSinceCreated} d</p>
//                             </div>
//                             <p class="font-bold max-w-2xl mt-3">${title}</p>
//                             <p class="font-light max-w-2xl mt-1 mb-5">${body}</p>
//                         </div>
//                     </a>
//         `;
//                 });
//                 postContainerAsc.classList.remove("hidden");
//             }
//         }
//     } finally {
//     }
// };

// const removeOldPost = () => {
//     postContainerAsc.classList.add("hidden");
// };

// newestPostBTN.addEventListener("click", () => {
//     removeOldPost();
//     getAllMyPosts();
// });

