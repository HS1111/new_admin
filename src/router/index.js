import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import Article from '@/views/Article'
import Publish from '@/views/Publish'
import Image from '@/views/Image'
import Comment from '@/views/Comment'
import Settings from '@/views/Settings'
import Fans from '@/views/Fans'



Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        component: Layout,
        children: [{
                path: '',
                name: 'home',
                component: Home
            },
            {
                path: '/article',
                name: 'article',
                component: Article
            },
            {
                path: '/publish',
                name: 'publish',
                component: Publish
            },
            {
                path: '/image',
                name: 'image',
                component: Image
            },
            {
                path: '/comment',
                name: 'comment',
                component: Comment
            },
            {
                path: '/settings',
                name: 'settings',
                component: Settings
            },
            {
                path: '/fans',
                name: 'fans',
                component: Fans
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//路由导航守卫
router.beforeEach((to, form, next) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (to.path === '/login') {
        return next()
    } else {
        if (user) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router