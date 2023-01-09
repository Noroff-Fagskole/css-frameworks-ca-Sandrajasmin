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

# LECTURE

## 1. set up prettier

npm install --save-dev --save-exact prettier (Prettier is an NPM package used to apply standardized code formatting to your project files. We can install Prettier as a devDependency)

echo {}> .prettierrc.json (create file in repo)

add to gitignore add
    dist
    node_modules
    .packed-lock.json
    _.min._

add to package.json
    "pretty": "npx prettier --write .",

Example from moodle
npx prettier -c src/js/joker.js (To test that the installation was successful)

npx prettier -w src/js/joker.js (Now we can run Prettier with the write flag enabled)

## 2. We can copy and paste this command into the package file as a custom task

    {
    "scripts": {
        "test": "node src/js/joker.js",
        "format": "prettier -w src/js/joker.js"
    },
    }

Run the command "npm run" format to check if this task is working as expected
Run "npm version patch" to update the version number.
