import { createRouter, createWebHistory } from "vue-router";

import BasePage from '@/pages/BasePage.vue'
import HomePage from '@/pages/Home/HomePage.vue'
import ProfileCreatePage from '@/pages/ProfileCreate/ProfileCreatePage.vue'
import ProfilePage from '@/pages/Profile/ProfilePage.vue'
import PostShowPage from '@/pages/PostShow/PostShowPage.vue'

// 
const routes = [
    {
        path: '/',
        component: BasePage,
        children: [
            { path: '', name: 'home', component: HomePage },
            { path: 'post/:id', name: 'post_show', component: PostShowPage },
        ]
    },
    { path: '/profile', name: 'profile', component: ProfilePage },
    { path: '/profile/create', name: 'profile_create', component: ProfileCreatePage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;