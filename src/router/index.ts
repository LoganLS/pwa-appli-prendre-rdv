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
        {
            path: '/prendre-rendez-vous',
            name: 'rdvForm',
            component: () => import('@/views/rdvForm.vue'),
            meta: {
                requiresAuth: true,
            },
        }
    ],
})

router.beforeEach(async (to, from, next) => {
    if (to.path === '/logout') {
        try {
            await signOut(auth)
            return next({ name: 'Login' })
        } catch (err) {
            return next({ name: from.name ? from.name : 'Home' })
        }
    }

    if(!to.meta.requiresAuth) {
        return next();
    }

    const isIdentified = await getCurrentUser()

    if (!isIdentified) {
        return next({ name: 'Login' })
    } else {
        return next()
    }
})

export default router
