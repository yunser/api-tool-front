<template>
    <my-page title="帮助">
        <ui-article>
            <h2>说明</h2>
            <p>注意：请求的接口，必须允许跨域。</p>
            <p>这个工具功能很不完善，强烈建议使用本站提供的 <router-link to="/plugin">接口测试插件</router-link> </p>
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
