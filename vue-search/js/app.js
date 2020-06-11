new Vue({
    el: '#app',
    data: {
        query: ''
    },
    methods: {
        onSubmit(e) {
            
        },
        onReset(e) {
            this.query = ''
            debugger;
        },
        onKeyup(e) {
            if (!this.query.length) this.onReset();
        }
    }
})