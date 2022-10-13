import moment from "moment";
import { GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID } from "./settings/api";
import {getMyToken} from "./utils/storage";

let now = moment(new Date()); // today's date
const accessToken = getMyToken();

const blogPost = document.querySelector("#blog-post");
const postsNotificationMessage = document.querySelector(".posts__notification");

async function getMyUserPosts() {
    const response = await fetch(GET_USER_POSTS_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.ok) {
        const jsonResponse = await response.json();
        blogPost.innerHTML = "";
        const {posts} = jsonResponse;
        if (!posts.length) {
            postsNotificationMessage.innerHTML = "Sorry you don't have posts currently";
        } else {
            const numberOfPosts = posts.length;
            for (let i = 0; i < numberOfPosts; i++) {
                const {created} = posts[i];
                console.log(posts[i])
                const secondsSinceCreated = now.diff(created, "01/12/2016");
                blogPost.innerHTML += `
                    <div class="posts__container flex mb-6">
                        <img class="post__container--img max-w-min" src="/img/person1.png" alt="profile picture" />
                        <div class="post__container--text ml-6">
                            <div class="flex flex-wrap">
                                <h2 class="font-extraBold text-base mr-6">Sharon Grey</h2>
                                <p class="font-light text-xs mt-1">${secondsSinceCreated} s ago</p>
                            </div>
                            <p class="font-bold max-w-2xl mt-3">
                                ${posts[i].title}
                            </p>
                            <p class="font-light max-w-2xl mt-1 mb-5">
                                ${posts[i].body}
                            </p>
                            <div class="flex gap-4">
                                <button
                                    data-id="${posts[i].id}"
                                    type="button"
                                    class="delete-post-btn inline-flex items-center rounded-md bg-lightblue px-3 mr-4 text-xs leading-4 text-white hover:bg-red">
                                        Delete
                                </button>
                                <a href="/edit-post.html?post_id=${posts[i].id}" class="inline-flex items-center rounded-md text-xs text-regular bg-lightblue px-3 py-2 leading-4 text-white hover:bg-purple">
                                    Edit
                                </a>
                            </div>
                        </div>
                    </div>
            `
            }
        }
    } else {
        postsNotificationMessage.innerHTML = await response.json()
    }
}

getMyUserPosts().then(() => {
    handleMyDeleteBtnsEvents();
})

function handleMyDeleteBtnsEvents() {
    let deletedButtons = document.getElementsByClassName('delete-post-btn');
    const totalNumberOfDeleteBtns = deletedButtons.length
    for (let i = 0; i < totalNumberOfDeleteBtns; i++) {
        console.log("the index of each delete BTN", i)
        deletedButtons[i].addEventListener('click', function () {
            const postId = this.dataset.id;
            handleMyDeletePostById(postId);
        });
    }
}

function handleMyDeletePostById(id) {
    const deleteMyUserById = async () => {
        try {
            let response = await fetch(`${DELETE_USER_POST_BY_ID}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                getMyUserPosts().then(() => {
                    handleMyDeleteBtnsEvents();
                });

            } else {
                const err = await response.json();
                const message = `Sorry some error ${err}`;
                throw Error(message)
            }
        } catch (error) {
        }
    }
    deleteMyUserById().then(r => {
    });
}
