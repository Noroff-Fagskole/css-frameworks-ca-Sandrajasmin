import moment from 'moment';
import { SORT_ASC_URL, GET_POSTS_URL } from './settings/api';
import { getMyToken } from './utils/storage';

const blogPost = document.querySelector('#blog-post');
const postsNotificationMessage = document.querySelector('.posts__notification');
const postDetails = document.querySelector('#publish__container');
let data = [];

const accessToken = getMyToken();
if (!accessToken) {
  location.href = '/login.html';
}

async function getAllMyPosts() {
  const response = await fetch(GET_POSTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    data = await response.json();
    displayPost(data);
  } else {
    const err = await response.json();
    const message = `Sorry some error ${err}`;
    postsNotificationMessage.innerHTML = err;
  }
}

const newestPostBTN = document.querySelector('#new-post-btn');
const oldestPostBTN = document.querySelector('#old-post-btn');

const postContainerAsc = document.querySelector('#postAsc-container');

oldestPostBTN.addEventListener('click', () => {
  removeNewPost();
  getPostAsc();
});

const removeOldPost = () => {
  postContainerAsc.classList.add('hidden');
};

newestPostBTN.addEventListener('click', () => {
  removeOldPost();
  getAllMyPosts();
});

const removeNewPost = () => {
  blogPost.classList.add('hidden');
};

const getPostAsc = async () => {
  try {
    const response = await fetch(SORT_ASC_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    if (response.ok) {
      const postsAsc = await response.json();
      console.log(postsAsc);
      let now = moment(new Date());
      if (!postsAsc.length) {
        postContainer.innerHTML = 'Sorry no post today!';
      } else {
        const listofPosts = postsAsc.map((postAsc) => {
          const { body, title, created, id } = postAsc;
          console.log(postAsc);
          const daysSinceCreated = now.diff(created, 'day');

          postContainerAsc.innerHTML += `
          <a href="/single-post.html?post_id=${id}" class="posts__container flex mb-6">
                        <img class="post__container--img max-w-min" src="/img/person1.png" alt="profile picture" />
                        <div class="post__container--text ml-6">
                            <div class="flex flex-wrap">
                                <h2 class="font-extraBold text-base mr-6">Kathy Holms</h2>
                                <p class="font-light text-xs mt-1">${daysSinceCreated} d</p>
                            </div>
                            <p class="font-bold max-w-2xl mt-3">
                            ${title}
                            </p>
                            <p class="font-light max-w-2xl mt-1 mb-5">
                            ${body}
                            </p>
                            
                        </div>
                    </a>
        `;
        });
        postContainerAsc.classList.remove('hidden');
      }
    }
  } finally {
  }
};

function displayPost(data) {
  blogPost.innerHTML = '';
  let now = moment(new Date()); //today's date
  if (!data.length) {
    postsNotificationMessage.innerHTML = 'Sorry there are no posts right now';
  } else {
    const listOfPosts = data
      .map((post) => {
        const postedBody = post.body;
        const postedTitle = post.title;
        const createdDate = post.created;
        const postOwner = post.owner;
        const dateCreated = now.diff(createdDate, 'days');

        return `
                    <a href="/single-post.html?post_id=${post.id}" class="posts__container flex mb-6">
                        <img class="post__container--img max-w-min" src="/img/person1.png" alt="profile picture" />
                        <div class="post__container--text ml-6">
                            <div class="flex flex-wrap">
                                <h2 class="font-extraBold text-base mr-6">Kathy Holms</h2>
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
            `;
      })
      .join('');
    blogPost.insertAdjacentHTML('beforeend', listOfPosts);
    blogPost.classList.remove('hidden');
  }
}
getAllMyPosts().then(() => {
  displayPost(data);
});

const searchBar = document.querySelector('#search');

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPosts = data.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchString) ||
      post.body.toLowerCase().includes(searchString)
    );
  });
  displayPost(filteredPosts);
});
