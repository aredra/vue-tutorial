export default {
    data: [
        {keyword: '한국'},
        {keyword: '오늘의요리'},
        {keyword: '제철'},
        {keyword: '홈파티'},
    ],

    list() {
        return new Promise(res => {
            setTimeout(() => {
                res(this.data);
            }, 531);
        })
    }
}