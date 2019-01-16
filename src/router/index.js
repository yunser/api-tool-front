import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Request = resolve => require(['@/views/Request'], resolve)
const Plugin = resolve => require(['@/views/Plugin'], resolve)
const StatusCode = resolve => require(['@/views/StatusCode'], resolve)
const RequestHeader = resolve => require(['@/views/RequestHeader'], resolve)
const ResponseHeader = resolve => require(['@/views/ResponseHeader'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/request',
        component: Request
    },
    {
        path: '/plugin',
        component: Plugin
    },
    {
        path: '/status_code',
        component: StatusCode
    },
    {
        path: '/request_header',
        component: RequestHeader
    },
    {
        path: '/response_header',
        component: ResponseHeader
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
