import { createRouter, createWebHistory } from "vue-router";

import HomePage from '@/pages/Home/HomePage.vue'
import ProfileCreatePage from '@/pages/ProfileCreate/ProfileCreatePage.vue'
import ProfilePage from '@/pages/Profile/ProfilePage.vue'
import PostShowPage from '@/pages/PostShow/PostShowPage.vue'

// Define routes with navigation guards to validate chain names
const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/profile', name: 'profile', component: ProfilePage },
    { path: '/profile/create', name: 'profile_create', component: ProfileCreatePage },
    { path: '/post/:id', name: 'post_show', component: PostShowPage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;