import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ConsumerIndex from '@/views/consumer/Index.vue'
import BusinessLayout from '@/views/business/layout/Index.vue'
import BusinessInfo from '@/views/business/updataInfo/Index.vue'
import BusinessRelease from '@/views/business/release/Index.vue'
import BusinessProgress from '@/views/business/progress/Index.vue'
import BusinessOrder from '@/views/business/order/Index.vue'
import Wine from '@/views/consumer/goods/wine/Index.vue'
import AcutionSucess from '@/views/consumer/success/Index.vue'
import AcutionHistory from '@/views/consumer/history/Index.vue'
import ConsumerInfo from '@/views/consumer/info/Index.vue'
import AuctionRecommend from '@/views/consumer/recommend/Index.vue'
import AdminUser from '@/views/admin/user/Index.vue'
import AdminAuction from '@/views/admin/auction/Index.vue'
import AdminOrder from '@/views/admin/order/Index.vue'
import AdminLayout from '@/views/admin/layout/Index.vue'
import AdminLogin from "@/views/adminlogin/AdminLogin.vue"


Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Login
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/consumer',
        name: 'consumerIndex',
        component: ConsumerIndex
    },
    {
        path: '/business',
        component: BusinessLayout,
        redirect: '/business/updataInfo',
        children: [{
                path: 'updataInfo',
                component: BusinessInfo,
                name: 'businessInfo'
            },
            {
                path: 'order',
                component: BusinessOrder,
                name: 'businessOrder'
            },
            {
                path: 'progress',
                component: BusinessProgress,
                name: 'BusinessProgress'
            },
            {
                path: 'release',
                component: BusinessRelease,
                name: 'BusinessRelease'
            }
        ]
    },
    {
        path: '/adminlogin',
        name: 'AdminLogin',
        component: AdminLogin
    },
    {
        path: '/admin',
        component: AdminLayout,
        redirect: '/admin/user',
        children: [{
                path: 'user',
                component: AdminUser,
                name: 'adminUser'
            },
            {
                path: 'order',
                component: AdminOrder,
                name: 'adminOrder'
            },
            {
                path: 'auction',
                component: AdminAuction,
                name: 'adminAuction'
            }
        ]
    },
    {
        path: '/good/wine/:id',
        component: Wine,
        props: true
    },

    {
        path: '/acution/success',
        component: AcutionSucess,
        props: true
    },
    {
        path: '/acution/history',
        name: "AcutionHistory",
        component: AcutionHistory
    },
    {
        path: '/acution/recommend',
        name: "AuctionRecommend",
        component: AuctionRecommend
    },
    {
        path: '/consumerinfo',
        name: "consumerInfo",
        component: ConsumerInfo
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router