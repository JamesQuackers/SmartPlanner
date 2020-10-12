import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import '../css/style.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';
import Food from "../views/Food";
import AddIngredient from "../views/AddIngredient";

Vue.use(VueRouter);


NProgress.configure({ showSpinner: false });

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/ingredient/add',
        name: 'AddIngredient',
        component: AddIngredient
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

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
});

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
});

export default router
