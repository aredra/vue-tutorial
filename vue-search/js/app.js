import SearchModel from './models/SearchModel.js';
import HistoryModel from "./models/HistoryModel.js";
import KeywordModel from "./models/KeywordModel.js";

new Vue({
  el: "#app",
  data: {
    query: "",
    searchResult: [],
    tabs: ["추천 검색어", "최근 검색어"],
    selectedTab: "",
    submited: false,
    keywordList: [],
    historyList: []
  },
  created() {
    this.selectedTab = this.tabs[0];
    this.fetchKeyword();
    this.fetchHistory();
  },
  methods: {
    onSubmit(e) {
      this.search();
    },
    onReset(e) {
      this.query = "";
      this.submited = false;
    },
    onKeyup(e) {
      if (!this.query.length) this.onReset();
    },
    onClickTab(tab) {
      this.selectedTab = tab;
      this.keywordList =
        this.selectedTab === "추천검색어"
          ? KeywordModel.list()
          : HistoryModel.list();
    },
    onClickKeyword(query) {
      this.query = query;
      this.search();
    },
    onClickRemoveHistory(item) {
      HistoryModel.remove(item.keyword);
      this.fetchHistory();
    },
    search() {
      HistoryModel.add(this.query);
      SearchModel.list().then((data) => {
        this.searchResult = data;
      });
      this.fetchHistory();
      this.submited = true;
    },
    fetchKeyword() {
      KeywordModel.list()
        .then((res) => {
          this.keywordList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchHistory() {
      HistoryModel.list()
        .then(res => {
          this.historyList = res;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
});