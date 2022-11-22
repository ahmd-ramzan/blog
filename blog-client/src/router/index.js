import {createRouter, createWebHistory} from 'vue-router'

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import Login from '../pages/Login.vue'
import Posts from '../pages/Admin/Posts.vue'

import {useAppStore} from "../store/app"

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/posts/:slug', name:'post', component: Post, props: true},
    {path: '/admin/login', name: 'admin.login', component: Login},
    {
        path: '/admin/posts',
        name: 'admin.posts',
        component: Posts,
        beforeEnter: (to, from, next) => {
            let appStore = useAppStore()
            if (appStore.authenticated === false) {
                return next({ name: 'admin.login'})
            }
            return next()
        }
    },
]

export default createRouter({
    history: createWebHistory(),
    routes
})