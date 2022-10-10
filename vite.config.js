const {resolve} = require('path');

export default {
    build: {
        rollupOptions: {
            input: {
                signIn: resolve(__dirname, 'index.html'),
                signUp: resolve(__dirname, 'sign-up.html'),
                home: resolve(__dirname, 'home.html'),
                profile: resolve(__dirname, 'user-profile.html'),
            },
        },
    },
};