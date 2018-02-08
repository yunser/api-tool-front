<template>
    <my-page title="浏览器插件">
        <ui-article>
            <h2>插件介绍</h2>
            <p>接口测试是开发中必不可少的一环。本插件提供接口测试的基本功能。</p>
            <h2>功能说明</h2>
            <p>1. 支持 GET、POST、PUT 和 DELETE 四种请求方式，方便 RESTful 接口测试。</p>
            <p>2. 完全离线使用、不依赖网络。</p>
            <p>3. 可以直接测试本地服务器接口。</p>
            <p>4. 相比在线接口测试，安全，更适合商业接口测试。</p>
            <p>5. 支持历史记录、模块管理等小工具，使用便捷。</p>
            <h2>下载</h2>
            <a href="/download/api-tool.yunser.com.crx" target="_blank">点击下载</a>
        </ui-article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                version: ''
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
</style>
