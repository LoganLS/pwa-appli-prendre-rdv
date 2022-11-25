import {createRouter, createWebHistory, type RouteLocation} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
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

// function isIdentified(to: RouteLocation): boolean {
//     if(!to.meta.requiresAuth) {
//         return true;
//     }

//     // return check
// }

router.beforeEach(async (to, from, next) => {
    // if (to.path === '/logout') {
    //     try {
    //         return next({ name: 'Login' })
    //     } catch (err) {
    //         return next({ name: from.name ? from.name : 'Home' })
    //     }
    // }

    // if (!isIdentified(to)) {
    //     return next({ name: 'Login' })
    // }

    return next()
})

export default router
