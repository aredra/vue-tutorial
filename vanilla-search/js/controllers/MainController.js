import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from "../views/TabView.js";
import KeywordView from "../views/KeywordView.js";
import HistoryView from "../views/HistoryView.js";

import SearchModel from '../models/SearchModel.js'
import KeywordModel from "../models/KeywordModel.js";
import HistoryModel from "../models/HistoryModel.js";


const tag = '[MainController]';

export default {
    init() {
        console.log(tag, 'init()');
        this.selectedTab = '추천 검색어';

        FormView.setup(document.querySelector('form'))
            .on('@submit', e=> this.onSubmit(e.detail.input))
            .on('@reset', e=> this.onReset(e));

        KeywordView.setup(document.querySelector('#search-keyword'))
            .on('@click', e=> this.onClickKeyword(e.detail.keyword));
        HistoryView.setup(document.querySelector('#search-history'))
            .on('@click', e => this.onClickHistory(e.detail.keyword))
            .on('@remove', e => this.onRemoveHistory(e.detail.keyword));
            
        ResultView.setup(document.querySelector('#search-result'));

        TabView.setup(document.querySelector('#tabs'))
            .on('@recommend', e => this.onRecommend(e))
            .on('@recently', e => this.onRecently(e));

        TabView.setActiveTab(this.selectedTab);
        this.renderView();
    },

    renderView() {
        if (this.selectedTab === '추천 검색어') {
            KeywordModel.list()
                .then(data => {
                    TabView.show();
                    HistoryView.hide();
                    KeywordView.render(data);
                })
                .catch(err => {
                    KeywordView.render(err);
                });
        } else {
            this.fetchSearchHistory();
        }
        ResultView.hide();
    },

    search(query) {
        console.log(tag, 'search()', query);
        SearchModel.list(query).then(res =>  {
            FormView.setValue(query);
            HistoryModel.add(query);
            this.onSearchResult(res);  
        })
        .catch(err => {
            console.log(err);
        })
    },

    fetchSearchHistory() {
        HistoryModel.list()
            .then(data => {
                TabView.show();
                KeywordView.hide();
                HistoryView.render(data).bindRemoveBtn();
            })
            .catch()
    },

    onSubmit(input) {
        console.log(tag, 'onSubmit()', input);
        this.search(input);
    },

    onReset(input) {
        console.log(tag, 'onReset()', input);
        ResultView.hide();
        this.renderView();   
     },

    onSearchResult(data) {
        TabView.hide();
        KeywordView.hide();
        HistoryView.hide();
        ResultView.render(data);
    },

    onRecently(e) {
        console.log(tag, "onRecently()", e);
        this.selectedTab = e.detail.selected;
        this.renderView();

    },

    onRecommend(e) {
        console.log(tag, "onRecommend()", e);
        this.selectedTab = e.detail.selected;
        this.renderView();

    },

    onClickKeyword(keyword) {
        this.search(keyword);    
    },

    onClickHistory(keyword) {
        this.search(keyword);
    },

    onRemoveHistory(keyword) {
        HistoryModel.remove(keyword);
        this.renderView();
    }
}