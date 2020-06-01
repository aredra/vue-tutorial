import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from "../views/TabView.js";

import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        this.selectedTab = '추천 검색어';

        FormView.setup(document.querySelector('form'))
            .on('@submit', e=> this.onSubmit(e.detail.input))
            .on('@reset', e=> this.onReset(e));

        ResultView.setup(document.querySelector('#search-result'));

        TabView.setup(document.querySelector('#tabs'))
            .on('@recommend', e => this.onRecommend(e))
            .on('@recently', e => this.onRecently(e));

        TabView.setActiveTab(this.selectedTab);
        this.renderView();
    },

    renderView() {
    },

    search(query) {
        console.log(tag, 'search()', query);
        SearchModel.list(query).then(res =>  {
            this.onSearchResult(res);  
        })
        .catch(err => {
            console.log(err);
        })
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input);
        this.search(input);
    },

    onReset(input) {
        console.log(tag, 'onReset()', input);
        ResultView.hide();
    },

    onSearchResult(data) {
        ResultView.render(data);
    },

    onRecently(e) {
        console.log(tag, "onRecently()", e);
    },

    onRecommend(e) {
        console.log(tag, "onRecommend()", e);
    }
}