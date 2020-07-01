export default {
    template: '#list',
    props: ['data', 'curr-tab'],
    computed: {
        getTab() {
            return this.currTab === "추천 검색어"
        }
    },
    methods: {
        onClickList(query) {
            this.$emit("click:list", query);
        },
        onClickRemoveList(item) {
            this.$emit("btn:remove", item);
        }
    }
}