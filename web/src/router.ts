import { createRouter, createWebHistory } from "vue-router";

import ProfileCreatePage from '@/pages/Profile/ProfileCreatePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import HomePage from '@/pages/HomePage.vue'

// Define routes with navigation guards to validate chain names
const routes = [
    { path: '/', name: 'home', component: HomePage },
    { path: '/profile', name: 'profile', component: ProfilePage },
    { path: '/profile/create', name: 'profile_create', component: ProfileCreatePage },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;