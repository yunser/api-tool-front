<template>
    <my-page title="帮助" backable>
        <ui-article>
            <h2>说明</h2>
            <p>本地模式：支持调试本地接口（http://localhost/xxx），安全，快速，要求接口允许跨域。</p>
            <p>非本地模式：支持调试非本地接口，不需要接口允许跨域。</p>
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
