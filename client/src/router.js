import Vue from 'vue';
import Router from 'vue-router';
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import {authGuard} from './auth/authGuard';
import {visitorGuard} from './auth/visitorGuard'

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: visitorGuard,
        },
        {
            path: '/dashboard',
            name: '/dashboard',
            component: Dashboard,
            beforeEnter: authGuard,
        },
        {
            path: '/',
            redirect: '/dashboard',
        },
    ],
});
