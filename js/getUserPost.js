import moment from "moment";
import { GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID } from "./settings/api";
import {getMyToken} from "./utils/storage";

let now = moment(new Date()); // today's date
const accessToken = getMyToken();

const postsContainer = document.querySelector("#blog-post");
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
        console.log("GET MY POSTS SUCCEEDED!!  🥳 🤗🤗");
        postsContainer.innerHTML = "";
        const {posts} = jsonResponse;
        if (!posts.length) {
            postsNotificationMessage.innerHTML = "Sorry you don't have posts currently";
        } else {
            const numberOfPosts = posts.length;
            for (let i = 0; i < numberOfPosts; i++) {
                const {created} = posts[i];
                console.log(posts[i])
                const secondsSinceCreated = now.diff(created, "seconds");
                postsContainer.innerHTML += `

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
        console.log("GET MY POSTS FAILED!!  😥😥😥");
    }
}

getMyUserPosts().then(() => {
    handleDeleteBtnsEvents();
})

function handleDeleteBtnsEvents() {
    // API CALL IS DONE AND WE HAVE THE POSTS CREATED WITH DELETE BTNS

    // get all the btns with class
    let deleteButtons = document.getElementsByClassName('delete-post-btn');
    console.log("deleteButtons: ", deleteButtons);
    // assign an event handler for each button
    const totalNumberOfDeleteBtns = deleteButtons.length
    for (let i = 0; i < totalNumberOfDeleteBtns; i++) {
        console.log("the index of each delete BTN", i)
        deleteButtons[i].addEventListener('click', function () {
            console.log(`${i} hi, you have triggered click event.`);
            console.log("this.dataset.postId: ", this.dataset)
            console.log("this.dataset.postId: ", this.dataset.id);
            console.log("this.dataset.postId: ", this.getAttribute("data-id"))
            const postId = this.dataset.id;
            //TODO Delete post by id
            handleDeletePostById(postId);
        });
    }
}

function handleDeletePostById(id) {
    //TODO delete post by id given
    console.log(id)
    console.log("delete post btn clicked ⭕ ⭕ ⭕ !! ")
    //TODO Refresh page
    // or go to home page
    // or loop on the current posts and update then to avoid refresh ** very hard
    const deleteUserById = async () => {
        try {
            let response = await fetch(`${DELETE_USER_POST_BY_ID}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if (response.status === 200) {
                console.log("delete post success ⭕ ⭕ ⭕ !! ");
                getUserPosts().then(() => {
                    handleDeleteBtnsEvents();
                });

            } else {
                const err = await response.json();
                const message = `Sorry some error ${err}`;
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
                throw Error(message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    deleteUserById().then(r => {
    });
}
