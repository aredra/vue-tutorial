export default {
    template: "#tabs",
    props: ['selectedTab'],
    data() {
        return {
          tabs: ["추천 검색어", "최근 검색어"],
        };
    },
    methods: {
        onClickTab(tab) {
            this.$emit("click:tab", tab);
        }
    },
}