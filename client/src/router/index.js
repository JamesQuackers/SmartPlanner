import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import '../css/style.css'
import Food from "../views/Food";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/food',
        name: 'Food',
        component: Food
    },
];

const router = new VueRouter({
    routes
});

export default router
