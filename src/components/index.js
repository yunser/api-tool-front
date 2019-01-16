import page from './page'
import textEditor from './text-editor'
import appList from './app-list'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('text-editor', textEditor)
        Vue.component('app-list', appList)
    }
}
