import {createRouter, createWebHistory} from 'vue-router'

import Home from '../pages/Home.vue'
import Post from '../pages/Post.vue'
import Login from '../pages/Login.vue'
import Posts from '../pages/Admin/Posts.vue'

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/posts/:slug', name:'post', component: Post, props: true},
    {path: '/admin/login', name: 'admin.login', component: Login},
    {path: '/admin/posts', name: 'admin.posts', component: Posts},
]

export default createRouter({
    history: createWebHistory(),
    routes
})