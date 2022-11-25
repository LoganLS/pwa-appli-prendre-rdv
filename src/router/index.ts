import {createRouter, createWebHistory, type RouteLocation} from 'vue-router'
import { useCurrentUser, getCurrentUser } from 'vuefire'
import { signOut } from 'firebase/auth'
import { auth } from '@/plugins/firebase'
import { ref } from 'vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/connexion',
            name: 'Login',
            component: () => import('@/views/auth/Login.vue'),
        },
        {
            path: '/inscription',
            name: 'Register',
            component: () => import('@/views/auth/Register.vue'),
        },
    ],
})

function isIdentified(to: RouteLocation): boolean {
    if(!to.meta.requiresAuth) {
        return true;
    }

    return  useCurrentUser().value !== null && useCurrentUser().value !== undefined
}

router.beforeEach(async (to, from, next) => {
    if (to.path === '/logout') {
        try {
            signOut(auth)
            return next({ name: 'Login' })
        } catch (err) {
            return next({ name: from.name ? from.name : 'Home' })
        }
    }

    if (!isIdentified(to)) {
        return next({ name: 'Login' })
    }

    return next()
})

export default router
