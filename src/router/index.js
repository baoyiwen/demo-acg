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
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/pages/Home/home.vue'),
                redirect: '/home',
                children: [
                    {
                        path: '/home',
                        name: 'home',
                        meta: {
                            lv: 1,
                            name: '导航页',
                            group: 1,
                            groupName: '第一组',
                            key: '1-1'
                        },
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () => import(/* webpackChunkName: "about" */ '@/views/layout/pages/Home/NavPage/NavPage'),
                    },
                ],
            },
            {
                path: '/car',
                name: 'car',
                meta: {
                    lv: 1,
                    name: '车辆信息查询',
                    key: "2"
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/pages/CarInfo/car.vue'),
                children: [
                    {
                        path: '/car',
                        name: 'car',
                        meta: {
                            lv: 1,
                            name: '车辆违章信息查询',
                             group: 1,
                             // groupName: '第一组',
                            key: '2-1'
                        },
                        component: () => import('@/views/layout/pages/CarInfo/carVOR/carVOR.vue')
                    }
                ]
            },
            {
                path: '/photo',
                name: 'photo',
                meta: {
                    lv: 1,
                    name: '图片信息管理',
                    key: "3"
                },
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '@/views/layout/pages/Photo-Main/photo-main.vue'),
                children: [
                    {
                        path: '/photoinfo',
                        name: 'photoinfo',
                        meta: {
                            lv: 1,
                            name: '查看Pixiv最新更新',
                            group: 1,
                            // groupName: '第一组',
                            key: '3-1'
                        },
                        component: () => import('@/views/layout/pages/Photo-Main/photo-info/photo-info.vue')
                    }
                ]
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
