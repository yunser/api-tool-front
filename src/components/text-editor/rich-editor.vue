<template>
    <div>
        <div class="editor-box">
            <pre :id="id" style="width: 640px; min-height: 300px;">
                <textarea class="ace_text-input"></textarea>
            </pre>
        </div>
    </div>
</template>

<script>
    const ace = window.ace

    export default {
        data() {
            return {
                id: '',
                editorContent: '',
                canEmit: true
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.id = 'ace-' + Math.random() * 1000
            // console.log('随机', this.id)
            this.editorContent = this.value
            this.$nextTick(() => {
                this.editor = ace.edit(this.id)
                // this.editor.session.setMode('ace/mode/json')
                this.editor.setFontSize(16)
                this.editor.setOption('wrap', 'free') // 自动换行,设置为off关闭
                this.editor.setValue(this.editorContent)
                this.editor.getSession().on('change', e => {
                    if (!this.canEmit) {
                        this.canEmit = true
                        return
                    }
                    this.editorContent = this.editor.getValue()
                    this.$emit('input', this.editorContent)
                })
            })
        },
        destroyed() {
            this.editor.destroy()
        },
        methods: {
            setValue(value) {
                this.editor.setValue(value)
            }
        },
        watch: {
            value() {
                console.log('呵呵')
                console.log(this.value)
                // this.editor.setValue(this.value)
                this.canEmit = false
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
