export default {
    data: [
        {keyword: '검색기록2', date: '05.26'},
        {keyword: '검색기록1', date: '05.25'},
        {keyword: '검색기록0', date: '05.24'}
    ],

    list() {
        return Promise.resolve(this.data);
    },
    
    add(keyword = '') {
        keyword = keyword.trim();
        if (!keyword) return;
        if (this.data.some(item => item.keyword === keyword)) {
            this.remove(keyword);
        }

        const date = '05.31';
        this.data = [{keyword, date}, ...this.data];
    },

    remove(keyword) {
        this.data = this.data.filter(item => item.keyword !== keyword);
    }
}