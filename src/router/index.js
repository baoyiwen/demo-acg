import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout/Layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'layout',
        component: layout,
        mode: {
            lv: 0,
            name: 'main'
        },
        children: [
            {
                path: '/',
                name: 'home',
                mode: {
                    lv: 1,
                    name: '主页'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
                redirect: 'home',
                children: [
                    {
                        path: '/home',
                        name: 'home',
                        mode: {
                            lv: 1,
                            name: '主页',
                            group: '第一组',
                        },
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
                    },
                    {
                        path: '/home2',
                        name: 'home',
                        mode: {
                            lv: 1,
                            name: '主页',
                            group: '第2组',
                        },
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
                    }
                ],
            },
            {
                path: '/about',
                name: 'about',
                mode: {
                    lv: 1,
                    name: '关于',
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
            },
            {
                path: '/test1',
                name: 'test1',
                mode: {
                    lv: 1,
                    name: '测试1',
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test1/test1.vue')
            },
            {
                path: '/test2',
                name: 'test2',
                mode: {
                    lv: 1,
                    name: '测试2',
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test2/test2.vue')
            },
            {
                path: '/test3',
                name: 'test3',
                mode: {
                    lv: 1,
                    name: '测试3',
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test3/test3.vue')
            },
            {
                path: '/test4',
                name: 'test4',
                mode: {
                    lv: 1,
                    name: '测试4',
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test4/test4.vue')
            },
        ],
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
