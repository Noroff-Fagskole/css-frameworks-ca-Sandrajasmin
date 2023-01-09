import { getMyToken } from './utils/storage';
import { GET_POST_BY_ID_URL } from './settings/api';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get('post_id');
const accessToken = getMyToken();
const singlePost = document.getElementById('blog-post');

async function getMyPostById() {
  const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  const { title, body, created, updated, id } = data;
  singlePost.innerHTML = `
                <div class="posts__container flex mb-6">
                    <img class="post__container--img max-w-min" src="/img/person1.png" alt="profile picture" />
                    <div>
                    <div class="post__container--text ml-6 flex flex-row flex-wrap">
                        <div class="">
                            <p class="font-bold max-w-2xl mt-1 mr-2">Title</p>
                            <p class="font-light text-xs mt-1 mr-2">${title}</p>
                        </div>
                        <div class="">
                            <p class="font-bold max-w-2xl mt-1 mr-2">ID</p>
                            <p class="font-light text-xs mt-1 mr-2">${id}</p>
                        </div>
                        <div class="">
                            <p class="font-bold max-w-2xl mt-1 mr-2">Created</p>
                            <p class="font-light text-xs mt-1 mr-2">${created}</p>
                        </div>
                        <div class="">
                            <p class="font-bold max-w-2xl mt-1 mr-2">Updated</p>
                            <p class="font-light text-xs mt-1 mr-2">${updated}</p>
                        </div>              
                    </div>
                    <div class="ml-6">
                        <p class="font-bold max-w-2xl mt-1 mr-2">Description</p>
                        <p class="flex flex-col font-light max-w-2xl mt-1 mb-5">${body}</p>  
                    </div> 
                    </div> 
                </div>
    `;
}

getMyPostById();
