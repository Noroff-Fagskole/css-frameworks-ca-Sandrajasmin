<img src="./.readme/noroff-light.png" width="160" align="right">

# CSS Framework CA

# Goal

To apply knowledge of Bootstrap, Tailwind and SASS to build a responsive front end for a social media application.

# Brief
You are tasked with creating 3 pages in HTML using Bootstrap or Tailwind or SASS:

- Homepage
- Profile page
- Login page

1. The Homepage should have a feed of posts from the user’s contacts, a search bar, and a form to create a new post.

2. The profile page should have a profile image, details about the user, a list of the user’s contacts, their posts and a form to post to their wall.

3. The login page should have a form to login to the application.

4. You will only be working on the visuals for this project at this stage, forms do not need to submit data, for example.

5. Submission for this project will follow the pattern used in professional development. 


# Process

## Please use vite for this Assignment

Create a design or wireframe for each page

Share this Pull Request with a teacher for their approval

Complete the approved Pull Request, or implement the required changes

# Resources

# https://vitejs.dev/

# https://tailwindcss.com/

# https://getbootstrap.com/docs/5.2/getting-started/vite/



## 1. remove

delete the file counter.js
delete app in index
delete all in style.ss
delete all inn main.js except import


## 2. check if project is running

npm i
npm fund
npm run build (build dist folder)
npm run dev

## 3. GET tailwind

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

remove module on json file
change name on to tailwind.config.js
create postcss.config.js
 - add "
 module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    }
}
"

add to style.css
"
@tailwind base;
@tailwind components;
@tailwind utilities;
"

change tailwind.config.js and change content
"
content: ["./*.{html,js}"],
"

npm run dev