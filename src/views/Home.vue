<template>
    <my-page title="HTTP" :page="page">
        <app-list :data="groups" />
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '应用',
                        apps: [
                            {
                                name: 'HTTP 请求',
                                desc: '',
                                icon: '/static/img/http.svg',
                                to: '/request'
                            },
                            {
                                name: '浏览器插件',
                                desc: '',
                                icon: '/static/img/http.svg',
                                to: '/plugin'
                            }
                        ]
                    },
                    {
                        name: '查询',
                        apps: [
                            {
                                name: 'HTTP 状态码',
                                desc: '',
                                icon: '/static/img/http.svg',
                                to: '/status_code'
                            },
                            {
                                name: 'HTTP 请求头',
                                desc: '',
                                icon: '/static/img/http.svg',
                                to: '/request_header'
                            },
                            {
                                name: 'HTTP 响应头',
                                desc: '',
                                icon: '/static/img/http.svg',
                                to: '/response_header'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=http',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=http',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
</style>
