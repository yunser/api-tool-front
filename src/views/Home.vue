<template>
    <my-page title="HTTP 请求">
        <section class="http-box">
            <div class="inputs">
                <ui-select-field class="type" v-model="type">
                    <ui-menu-item value="GET" title="GET"/>
                    <ui-menu-item value="POST" title="POST"/>
                </ui-select-field>
                <ui-text-field class="form-control url" v-model="url" placeholder="http://" />
                <ui-raised-button label="发送请求" primary @click="request" />
                <input type="checkbox" v-model="showParams">
                <label> URL params</label>
                <input type="checkbox" v-model="showHeader">
                <label> Headers</label>
            </div>
            <div class="" v-if="showParams">
                <table class="table table-bordered">
                    <tr>
                        <th>请求参数（URL Parameter Key）</th>
                        <th>值（Value）</th>
                    </tr>
                    <tr v-for="param in params">
                        <td class="param-key"><input class="form-control" v-bind:value="param.key"></td>
                        <td class="param-value">
                            <input class="form-control" v-bind:value="param.value">
                            <button class="btn btn-link" @click="removeParam(param.key)">删除</button>
                        </td>
                    </tr>
                    <tr>
                        <td><button class="btn btn-info send" @click="addParam">添加</button></td>
                        <th></th>
                    </tr>
                </table>
            </div>
            <div v-if="showHeader">
                <label></label>
                <table class="table table-bordered">
                    <tr>
                        <th>请求头 Header</th>
                        <th>值 Value</th>
                    </tr>
                    <tr v-for="header in requestHeader">
                        <td class="param-key"><input class="form-control" v-bind:value="header.key"></td>
                        <td class="param-value">
                            <input class="form-control" v-bind:value="header.value">
                            <button class="btn btn-link" @click="removeHeader(header.key)">删除</button>
                        </td>
                    </tr>
                    <tr>
                        <td><button class="btn btn-info send" @click="addHeader">添加</button></td>
                        <th></th>
                    </tr>
                </table>
            </div>
            <div>
                <textarea class="form-control result" v-model="result" rows="16" placeholder="返回结果"></textarea>

                <div class="state">Status {{ status }}  Time: {{ time }}</div>
                <table class="table table-bordered">
                    <tr>
                        <th>Response Header</th>
                        <th>Response Body</th>
                    </tr>
                    <tr v-for="header in responseHeader">
                        <td>{{ header.key }}</td>
                        <td>{{ header.value }}</td>
                    </tr>
                </table>
            </div>
        </section>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                url: 'http://',
                type: 'GET',
                result: '',
                params: [
                    {
                        key: '',
                        value: ''
                    }
                ],
                requestHeader: [
                    {
                        key: 'asa',
                        value: 'asa'
                    }
                ],
                responseHeader: [],
                status: '',
                time: '',
                showParams: false,
                showHeader: false
            }
        },
        mounted () {
            this.request()
        },
        methods: {
            handler(response) {
                this.result = JSON.stringify(response.data)
                console.log(response)
                var map = response.headers.map
                this.responseHeader = []
                for (var key in map) {
                    this.responseHeader.push({
                        key: key,
                        value: map[key][0]
                    })
                }
                this.status = response.status
                this.time = (new Date().getTime() - this.startTime) + ' ms'
            },
            request() {
                if (!this.url) {
                    return
                }
                this.startTime = new Date().getTime()

//                var methor
                var options = {
                    // headers: this.requestHeader
                }
                if (this.type === 'GET') {
                    this.$http.get(this.url, options).then(this.handler)
                } else {
                    this.$http.post(this.url, this.params, options).then(this.handler)
                }
            },
            addHeader() {
                this.responseHeader.push({
                    key: '',
                    value: ''
                })
            },
            removeHeader(key) {
                for (var i = 0; i < this.responseHeader.length; i++) {
                    if (this.responseHeader[i].key === key) {
                        this.responseHeader.splice(i, 1)
                        break
                    }
                }
            },
            addParam() {
                this.params.push({
                    key: '',
                    value: ''
                })
            },
            removeParam(key) {
                for (var i = 0; i < this.params.length; i++) {
                    if (this.params[i].key === key) {
                        this.params.splice(i, 1)
                        break
                    }
                }
            },
            clear() {
                this.text = ''
                this.compute()
            }
        }
    }
</script>

<style lang="scss" scoped>
    /**/
    .http-box {
        .type {
            width: 32px;
            margin-right: 8px;
        }
        .url {
            width: 480px;
            margin-right: 8px;
        }
    }
    .http-box .inputs {
        margin-bottom: 16px;
    }
    .http-box .type {
        display: inline-block;
        width: 160px;
    }
    .http-box .send {
    }
    .http-box .param-key {
        width: 320px;
    }
    .http-box .param-key input {
        width: 160px;
    }
    .http-box .param-value {

    }
    .http-box .param-value input {
        display: inline-block;
        width: 160px;
    }
    .http-box .result {
        margin-bottom: 16px;
        width: 640px;
    }
    .http-box table {
        width: 640px;
    }
    .http-box .state {
        margin-bottom: 16px;
    }
</style>
