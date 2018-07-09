<template>
    <my-page title="HTTP 请求" :page="page">
        <div class="layout-side">
            <div class="search-box">
                <input class="input" v-model="keyword" placeholder="搜索接口" />
                <ui-icon-button icon="search" @click="search" />
            </div>
            <div class="empty" v-if="!filterHistorys.length">暂无记录~</div>
            <ul class="historys-list">
                <li class="item" v-for="item in filterHistorys">
                    <span class="method" @click="selectItem(item)">{{ item.method }}</span>
                    <span class="url" @click="selectItem(item)">{{ item.url }}</span>
                    <ui-icon-menu
                        class="icon"
                        icon="more_vert"
                        :anchorOrigin="leftTop"
                        :targetOrigin="leftTop"
                        @click.native.top="doNothing"
                        >
                        <ui-menu-item title="删除" @click="removeItem(item, index)" />
                    </ui-icon-menu>
                </li>
            </ul>
        </div>
        <section id="http-box" class="http-box">
            <div class="request-header">
                <div class="container">
                    <div class="inputs fixed2">
                        <ui-select-field class="method" v-model="type">
                            <ui-menu-item value="GET" title="GET"/>
                            <ui-menu-item value="POST" title="POST"/>
                            <ui-menu-item value="PUT" title="PUT"/>
                            <ui-menu-item value="DELETE" title="DELETE"/>
                            <ui-menu-item value="HEAD" title="HEAD"/>
                            <ui-menu-item value="CONNECT" title="CONNECT"/>
                            <ui-menu-item value="OPTIONS" title="OPTIONS"/>
                            <ui-menu-item value="TRACE" title="TRACE"/>
                        </ui-select-field>
                        <ui-text-field class="url" v-model="request.url" placeholder="http://" />
                        <ui-raised-button class="btn" label="发送" primary @click="doRequest" />
                        <ui-flat-button class="btn" label="保存" @click="save" />
                    </div>
                </div>
                <ui-tabs class="tab-request" :value="activeTab2" @change="handleTabChange2">
                    <ui-tab value="body" title="Body" :disabled="type === 'GET' || type === 'HEAD'"/>
                    <ui-tab value="headers" :title="requestHeaderText"/>
                    <ui-tab value="tests" title="测试"/>
                </ui-tabs>
            </div>
            <div class="request-box container" v-if="activeTab2 === 'body'">
                <div class="request-type">
                    <ui-radio class="radio" v-model="requestType" label="form-data" name="group" nativeValue="form_data" />
                    <ui-radio class="radio" v-model="requestType" label="x-www-form-urlencoded" name="group" nativeValue="x-www-form-urlencoded" />
                    <ui-radio class="radio" v-model="requestType" label="row" name="group" nativeValue="row" />
                    <ui-select-field class="contant-type" v-model="contentType" v-if="requestType === 'row'">
                        <ui-menu-item value="" title="Text"/>
                        <ui-menu-item value="text/plain" title="Text (text/plain)"/>
                        <ui-menu-item value="application/json" title="JSON (application/json)"/>
                        <ui-menu-item value="application/javascript" title="Javascript (application/javascript)"/>
                        <ui-menu-item value="application/xml" title="XML (application/xml)"/>
                        <ui-menu-item value="text/xml" title="XML (text/xml)"/>
                        <ui-menu-item value="text/html" title="HTML (text/html)"/>
                    </ui-select-field>
                </div>
                <div class="" v-if="requestType === 'form_data' || requestType === 'x-www-form-urlencoded'">
                    <table class="key-value-table">
                        <tr>
                            <th class="col-enable"></th>
                            <th class="col-key">Key</th>
                            <th class="col-value">Value</th>
                            <th class="col-op">
                                <ui-icon-button class="remove" icon="add" @click="addParam(index)" title="添加"/>
                            </th>
                        </tr>
                        <tr v-for="param, index in params" :class="{disabled: !param.enable}">
                            <td class="col-enable">
                                <ui-checkbox class="checkbox" v-model="param.enable" label="" />
                            </td>
                            <td class="col-key">
                                <input class="input" v-model="param.key" placeholder="key">
                            </td>
                            <td class="col-value">
                                <input class="input" v-model="param.value" placeholder="value">
                            </td>
                            <td class="col-op">
                                <ui-icon-button class="remove" icon="add" @click="addParam(index)" title="添加"/>
                                <ui-icon-button class="remove" icon="close" @click="removeParam(index)" title="删除"/>
                            </td>
                        </tr>
                    </table>
                </div>
                <text-editor class="form-control row" v-model="requestRowBody" v-if="requestType === 'row'" />
                <!-- <textarea class="form-control row" v-model="requestRowBody" rows="8" placeholder="body" v-if="requestType === 'row'"></textarea> -->
                <div class="mask" v-if="type === 'GET' || type === 'HEAD'"></div>
            </div>
            <div class="" v-if="activeTab2 === 'headers'">
                <table class="table table-bordered key-value-table">
                    <tr>
                        <th class="col-enable"></th>
                        <th class="col-key">Key</th>
                        <th class="col-value">Value</th>
                        <th class="col-op">
                            <ui-icon-button class="remove" icon="add" @click="addHeader(index)" title="添加"/>
                        </th>
                    </tr>
                    <tr v-for="header, index in requestHeaders" :class="{disabled: !header.enable}">
                        <td class="col-enable">
                                <ui-checkbox class="checkbox" v-model="header.enable" label="" />
                            </td>
                        <td class="col-key">
                            <input class="input" v-model="header.key" placeholder="key">
                        </td>
                        <td class="col-value">
                            <input class="input" v-model="header.value" placeholder="value">
                        </td>
                        <td class="col-op">
                            <ui-icon-button class="remove" icon="add" @click="addHeader(index)" title="添加"/>
                            <ui-icon-button class="remove" icon="close" @click="removeHeader(index)" title="删除"/>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="container" v-if="activeTab2 === 'tests'">
                <text-editor class="form-control test" v-model="testCode" />
            </div>
            <div class="response-header">
                <div class="response-text" v-if="!response.enable">Response</div>
                <ui-tabs class="tab-response" :value="activeTab" @change="handleTabChange" v-if="response.enable">
                    <ui-tab value="body" title="Body"/>
                    <ui-tab value="cookies" title="Cookies"/>
                    <ui-tab value="headers" :title="`Headers (${responseHeaders.length})`"/>
                    <ui-tab value="tests" :title="testResultTitle"/>
                </ui-tabs>
                <div class="state" v-if="status">
                    <span class="status">Status: <span class="value">{{ status }}</span></span>
                    <span class="time">Time: <span class="value">{{ time }} ms</span></span>
                </div>
            </div>
            <div class="loading-box" v-if="loading">
                <div class="ui-loading">
                    <ui-circular-progress :size="24"/>
                </div>
                <div class="text">加载中...</div>
            </div>
            <div class="response-empty" v-if="!response.enable && !loading">
                <div class="text">点击「发送」按钮发送请求</div>
            </div>
            <div class="container response-tab-content" v-if="activeTab === 'body'">
                <text-editor class="form-control result" v-model="response.body" v-if="response.enable" />
                <!-- <textarea class="form-control result" v-model="response.body" rows="16" 
                    placeholder="返回结果" v-if="response.enable"></textarea> -->
            </div>
            <div class="container response-tab-content" v-if="activeTab === 'headers'">
                <ui-article>
                    <!-- <p>Response Headers</p> -->
                    <table class="table table-bordered">
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                        <tr v-for="header in responseHeaders">
                            <td>{{ header.key }}</td>
                            <td>{{ header.value }}</td>
                        </tr>
                    </table>
                </ui-article>
            </div>
            <div class="container response-tab-content" v-if="activeTab === 'tests'">
                <div class="test-result-empty" v-if="!testResult.length">没有任何测试用例</div>
                <ul class="test-result-list" v-if="testResult.length">
                    <li class="item" v-for="item in testResult">
                        <ui-badge class="state success" color="#4caf50" content="通过" v-if="item.isSuccess" />
                        <ui-badge class="state fail" color="#f44336" content="失败" v-else />
                        <!-- <div class="state success" v-if="item.isSuccess">通过</div> -->
                        <!-- <div class="state fail" v-else>失败</div> -->
                        <div class="text">{{ item.text }}</div>
                    </li>
                </ul>
            </div>
            <div class="container" v-if="activeTab === 'cookies'">
                <div class="cookie-empty">浏览器版本暂不支持 Cookie</div>
            </div>
        </section>
        <ui-drawer right :open="drawerVisible" @close="toggleDrawer()">
            <ui-appbar title="收藏">
                <ui-icon-button icon="close" slot="left" @click="toggleDrawer" />
            </ui-appbar>
            <ui-list>
            <ui-list-item title="Menu Item 1"/>
            <ui-list-item title="Menu Item 2"/>
            <ui-list-item title="Menu Item 3"/>
            <ui-list-item @click.native="open = false" title="Close"/>
            </ui-list>
        </ui-drawer>
        <ui-drawer class="setting-box" right :open="settingVisible" @close="toggleSetting()">
            <ui-appbar title="设置">
                <ui-icon-button icon="close" slot="left" @click="toggleSetting" />
            </ui-appbar>
            <div class="body">
                <ui-checkbox class="checkbox" v-model="isLocalRequest" label="本地调试" :value="true"/>
                <br>
                <ui-raised-button label="清空收藏夹" @click="clearHistory" />
            </div>
        </ui-drawer>
    </my-page>
</template>

<script>
    const qs = require('qs')

    export default {
        data () {
            return {
                loading: false,
                request: {
                    url: 'http://'
                },
                response: {
                    enable: false,
                    // enable: true,
                    body: ''
                },
                keyword: '',
                activeTab: 'body',
                activeTab2: 'headers',
                requestType: 'form_data',
                contentType: '',
                requestRowBody: '',
                type: 'GET',
                testCode: 'tests["Status code is 200"] = responseCode.code === 200;\ntests["Status code is 404"] = responseCode.code === 404;',
                testResult: [
                    // {
                    //     text: 'Status code is 200',
                    //     isSuccess: true
                    // },
                    // {
                    //     text: 'Status code is 300',
                    //     isSuccess: false
                    // }
                ],
                params: [
                    {
                        enable: true,
                        key: '',
                        value: ''
                    }
                ],
                historys: [
                    {
                        method: 'GET',
                        url: 'http://localhost:1026/'
                    }
                ],
                responseHeaders: [],
                requestHeaders: [
                    {
                        enable: true,
                        key: '',
                        value: ''
                    }
                ],
                status: '',
                time: '',
                showParams: true,
                drawerVisible: false,
                settingVisible: false,
                isLocalRequest: true,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'settings',
                            click: this.toggleSetting,
                            title: '设置'
                        },
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        computed: {
            filterHistorys() {
                if (!this.keyword) {
                    return this.historys
                }
                return this.historys.filter(item => item.url.includes(this.keyword))
            },
            requestHeaderText() {
                let headerLength = this.requestHeaders.filter(item => item.key).length
                return 'Headers' + (headerLength ? ` (${headerLength})` : '')
            },
            testResultTitle() {
                let text = ''
                if (this.testResult && this.testResult.length) {
                    let successCount = this.testResult.filter(item => item.isSuccess).length
                    text = ` (${successCount}/${this.testResult.length})`
                }
                return '测试结果' + text
            }
        },
        mounted () {
            this.historys = this.$storage.get('historys', this.historys)
            this.request.url = this.$storage.get('url', this.request.url)
            // this.request()
            this.onResize()
            window.addEventListener('resize', this._onResize = () => {
                this.onResize()
            })
            document.getElementById('http-box').addEventListener('scroll', this._onSroll = e => {
                // console.log(e.target.scrollTop)
            })
            // this.doTest()
        },
        methods: {
            doTest() {
                window.status = parseInt(this.status)
                console.log('window.status', window.status)
                let code = `let tests = {};
                    let responseCode = {
                        code: parseInt(window.status)
                    };
                    console.log(responseCode)
                    console.log('test start');` + this.testCode +
                    `window.tests = tests
                    console.log('test end')`
                // eslint-disable-next-line
                window.eval(code)
                console.log(window.tests)
                this.testResult = []
                for (let key in window.tests) {
                    this.testResult.push({
                        text: key,
                        isSuccess: window.tests[key]
                    })
                }
            },
            doNothing() {
            },
            onResize() {},
            handleTabChange(val) {
                this.activeTab = val
            },
            handleTabChange2(val) {
                this.activeTab2 = val
            },
            toggleDrawer() {
                this.drawerVisible = !this.drawerVisible
            },
            toggleSetting() {
                this.settingVisible = !this.settingVisible
            },
            removeItem(item, index) {
                this.historys.splice(index, 1)
            },
            selectItem(item) {
                this.request.url = item.url
                this.type = item.method
                this.requestHeaders = item.requestHeaders || []
                this.params = item.params || []
            },
            save() {
                this.historys.unshift({
                    method: this.type,
                    url: this.request.url,
                    requestHeaders: this.requestHeaders,
                    params: this.params
                })
                this.$storage.set('historys', this.historys)
            },
            clearHistory() {
                this.historys = []
                this.$storage.set('historys', this.historys)
            },
            handler(response) {
                console.log('处理')
                console.log(response)
                this.response.body = JSON.stringify(response.data)
                console.log(response)
                for (let key in response.headers) {
                    this.responseHeaders.push({
                        key: key,
                        value: response.headers[key]
                    })
                }
                this.response.enable = true
                this.status = response.status
                this.time = new Date().getTime() - this.startTime
                this.afterRequest()
                this.loading = false
            },
            afterRequest() {
                this.doTest()
            },
            handlerError(response) {
                console.log('错2误')
                console.log('处理')
                console.log(response)
                this.response.body = JSON.stringify(response.data)
                for (let key in response.headers) {
                    this.responseHeaders.push({
                        key: key,
                        value: response.headers[key]
                    })
                }
                this.response.enable = true
                this.status = response.status
                this.time = new Date().getTime() - this.startTime
                this.afterRequest()
                this.loading = false
            },
            doRequest() {
                if (!this.request.url) {
                    this.$message({
                        type: 'danger',
                        text: '请输入 URL'
                    })
                    return
                }
                this.$storage.set('url', this.request.url)
                this.startTime = new Date().getTime()
                this.responseHeaders = []
                this.response.enable = false
                this.loading = true
                if (this.isLocalRequest) {
                    this.localRequest()
                } else {
                    this.remoteRequest()
                }
            },
            localRequest() {
                console.log('local request')
                let options = {
                    headers: {}
                }
                //
                let data = ''
                let params = this.params.filter(item => item.key && item.enable)
                let paramObject = {}
                if (params.length) {
                    for (let param of params) {
                        paramObject[param.key] = param.value
                    }
                }

                if (this.requestType === 'form_data') {
                    data = new FormData()
                    for (let key in paramObject) {
                        data.append(key, paramObject[key])
                    }
                    options.headers['Content-Type'] = 'multipart/form-data'
                } else if (this.requestType === 'x-www-form-urlencoded') {
                    data = qs.stringify(paramObject)
                } else if (this.requestType === 'row') {
                    options.headers['Content-Type'] = ''
                    data = this.requestRowBody
                }

                console.log('data')
                console.log(data)
                console.log(options)
                //
                let headers = this.requestHeaders.filter(item => item.key && item.enable)
                if (headers.length) {
                    for (let header of headers) {
                        options.headers[header.key] = header.value
                    }
                }
                if (this.type === 'GET' || this.type === 'HEAD') {
                    this.$http[this.type.toLowerCase()](this.request.url, options)
                        .then(this.handler, this.handlerError).catch(this.handlerError)
                } else {
                    this.$http.post(this.url, data, options)
                        .then(this.handler)
                        .catch(this.handlerError)
                }
            },
            remoteRequest() {
                console.log('remoteRequest')
                this.$http.post('http', {
                    method: this.type,
                    url: this.request.url,
                    params: this.params.filter(item => item.key && item.enable),
                    requestHeaders: this.requestHeaders.filter(item => item.key && item.enable)
                }).then(response => {
                    let data = response.data
                    this.response.enable = true
                    this.response.body = data.response
                    this.responseHeaders = data.responseHeaders
                    this.status = data.status
                    this.time = data.time
                    this.afterRequest()
                    this.loading = false
                }, response => {
                    this.loading = false
                })
            },
            addHeader(index) {
                this.requestHeaders.splice(index + 1, 0, {
                    enable: true,
                    key: '',
                    value: ''
                })
            },
            removeHeader(index) {
                this.requestHeaders.splice(index, 1)
            },
            addParam(index) {
                this.params.splice(index + 1, 0, {
                    enable: true,
                    key: '',
                    value: ''
                })
            },
            removeParam(index) {
                this.params.splice(index, 1)
            },
            clear() {
                this.text = ''
                this.compute()
            },
            setContentType(contentType) {
                let hasFind = false
                for (let i = 0; i < this.requestHeaders.length; i++) {
                    if (this.requestHeaders[i].key === 'Content-Type') {
                        this.requestHeaders[i].value = contentType
                        hasFind = true
                        break
                    }
                }
                if (!hasFind) {
                    this.requestHeaders.push({
                        enable: true,
                        key: 'Content-Type',
                        value: contentType
                    })
                }
            },
            search() {
            }
        },
        watch: {
            type(value) {
                if (value === 'GET' || value === 'HEAD') {
                    if (this.activeTab2 === 'body') {
                        this.activeTab2 = 'headers'
                    }
                }
            },
            requestType(value) {
                if (value === 'x-www-form-urlencoded') {
                    this.setContentType('application/x-www-form-urlencoded')
                }
            },
            contentType(value) {
                this.setContentType(value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    /**/
</style>
