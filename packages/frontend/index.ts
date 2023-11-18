import { createWebHistory, createRouter } from 'vue-router';
import App from './src/App.vue';
import Home from './src/pages/Home.vue';
import About from './src/pages/About.vue';
import './src/style.css';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/about/:name',
            name: 'About',
            component: About,
            props: true,
        },
    ],
});

export { App, router };
