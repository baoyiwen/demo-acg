import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout/Layout'

Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        name: 'layout',
        component: layout,
        meta: {
            lv: 0,
            name: 'main'
        },
        children: [
            {
                path: '/',
                name: 'home',
                meta: {
                    lv: 1,
                    name: '主页',
                    groupType: true,
                    key: '1'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/Home/home.vue'),
                redirect: '/home',
                children: [
                    {
                        path: '/home',
                        name: 'home',
                        meta: {
                            lv: 1,
                            name: '主页',
                            group: 1,
                            groupName: '第一组',
                            key: '1-1'
                        },
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
                    },
                    {
                        path: '/home1',
                        name: 'home1',
                        meta: {
                            lv: 1,
                            name: '主页1',
                            group: 1,
                            groupName: '第一组',
                            key: '1-2'
                        },
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
                    },
                    {
                        path: '/test5',
                        name: 'test5',
                        meta: {
                            lv: 1,
                            name: '测试5',
                            group: 2,
                            groupName: '第二组',
                            key: '1-3',
                        },
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test5/test5.vue'),
                    }
                ],
            },
            {
                path: '/about',
                name: 'about',
                meta: {
                    lv: 1,
                    name: '关于',
                    key: '2'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
            },
            {
                path: '/test1',
                name: 'test1',
                meta: {
                    lv: 1,
                    name: '测试1',
                    key: 3,
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test1/test1.vue')
            },
            {
                path: '/test2',
                name: 'test2',
                meta: {
                    lv: 1,
                    name: '测试2',
                    key: "4"
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test2/test2.vue')
            },
            {
                path: '/test3',
                name: 'test3',
                meta: {
                    lv: 1,
                    name: '测试3',
                    key: '5'
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/test3/test3.vue')
            },
            {
                path: '/test4',
                name: 'test4',
                meta: {
                    lv: 1,
                    name: '测试4',
                    key: "6"
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
export const mapRoutes = {

}
