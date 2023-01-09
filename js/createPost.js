import { getMyToken } from './utils/storage';
import { CREATE_POST_URL } from './settings/api';

const createMyPostForm = document.querySelector('#create-post-form');

const postMyTitle = document.querySelector('#postTitle');
const postMyTitleError = document.querySelector('#postTitleError');

const postMyDescription = document.querySelector('#postDescription');
const postMyDescriptionError = document.querySelector('#postDescriptionError');

createMyPostForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let isPostMyTitle = false;
  if (postMyTitle.value.trim().length > 0) {
    postMyTitleError.classList.add('hidden');
    isPostMyTitle = true;
  } else {
    postMyTitleError.classList.remove('hidden');
  }

  let isMyPostDescription = false;
  if (postMyDescription.value.trim().length > 0) {
    postMyDescriptionError.classList.add('hidden');
    isMyPostDescription = true;
  } else {
    postMyDescriptionError.classList.remove('hidden');
  }

  let isMyFormValid = isPostMyTitle && isMyPostDescription;

  if (isMyFormValid) {
    const postData = {
      title: postMyTitle.value,
      body: postMyDescription.value,
    };
    const accessToken = getMyToken();
    (async function createMyPost() {
      const response = await fetch(CREATE_POST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const data = await response.json();
        location.href = '/welcome.html';
      } else {
        const err = await response.json();
        const message = 'Creating post failed';
        throw new Error(message);
      }
      createMyPostForm.reset();
    })().catch((err) => {
      console.log(err);
    });
  } else {
    console.log('Validation failed');
  }
});
