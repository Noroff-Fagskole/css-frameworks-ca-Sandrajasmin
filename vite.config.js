const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                signIn: resolve(__dirname, 'index.html'),
                signUp: resolve(__dirname, 'sign-up.html'),
                home: resolve(__dirname, 'welcome.html'),
                profile: resolve(__dirname, 'user-profile.html'),
                createPost: resolve(__dirname, 'create-post.html'),
                myPost: resolve(__dirname, 'my-post.html'),
                singlePost: resolve(__dirname, 'single-post.html'),
                editPost: resolve(__dirname, 'edit-post.html'),

            },
        },
    },
};
