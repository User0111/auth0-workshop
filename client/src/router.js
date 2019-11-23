import Vue from 'vue';
import Router from 'vue-router';
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/dashboard',
            name: '/dashboard',
            component: Dashboard,
        },
        {
            path: '/',
            redirect: '/dashboard',
        },
    ],
});
