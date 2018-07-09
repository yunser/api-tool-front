import page from './page'
import textEditor from './text-editor'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('text-editor', textEditor)
    }
}
