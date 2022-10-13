import moment from "moment";

import {GET_POSTS_URL} from "./settings/api";
import {getMyToken} from "./utils/storage";

const blogPost = document.querySelector("#blog-post");
const postsNotificationMessage = document.querySelector(".posts__notification")
const accessToken = getMyToken();
if(!accessToken){
    location.href = "/login.html"
}

(async function getAllMyPosts() {
    const response = await fetch(GET_POSTS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.ok) {
        const posts = await response.json();
        let now = moment(new Date()); //today's date
        if (!posts.length) {
            postsNotificationMessage.innerHTML = "Sorry there are no posts right now";
        } else {
            const listOfPosts = posts.map((post) => {
                const postedBody = post.body;
                const postedTitle = post.title;
                const createdDate = post.created;
                const dateCreated = now.diff(createdDate, 'days');

                return (`
                    <a href="/single-post.html?post_id=${post.id}" class="posts__container flex mb-6">
                        <img class="post__container--img max-w-min" src="/img/person1.png" alt="profile picture" />
                        <div class="post__container--text ml-6">
                            <div class="flex flex-wrap">
                                <h2 class="font-extraBold text-base mr-6">Sharon Grey</h2>
                                <p class="font-light text-xs mt-1">${dateCreated} d</p>
                            </div>
                            <p class="font-bold max-w-2xl mt-3">
                            ${postedTitle}
                            </p>
                            <p class="font-light max-w-2xl mt-1 mb-5">
                            ${postedBody}
                            </p>
                            
                        </div>
                    </a>
            `)
            }).join('');
            blogPost.insertAdjacentHTML('beforeend', listOfPosts);
        }

    } else {
        const err = await response.json();
        const message = `Sorry some error ${err}`;
        throw new Error(message)
    }
})().catch(err => {
    postsNotificationMessage.innerHTML = err
});
