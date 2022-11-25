import {createRouter, createWebHistory, type RouteLocation} from 'vue-router'
import { getCurrentUser } from 'vuefire'
import { signOut } from 'firebase/auth'
import { auth } from '@/plugins/firebase'

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

async function isIdentified(to: RouteLocation): Promise<boolean> {
    if(!to.meta.requiresAuth) {
        return true;
    }

    const user = await getCurrentUser()
    return user !== null
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
