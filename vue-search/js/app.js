import SearchModel from './models/SearchModel.js';
import HistoryModel from "./models/HistoryModel.js";
import KeywordModel from "./models/KeywordModel.js";

import FormComponent from "./components/FormComponent.js";
import ResultComponent from "./components/ResultComponent.js";
import ListComponent from "./components/ListComponent.js";
import TabComponent from "./components/TabComponent.js";


new Vue({
  el: "#app",
  data: {
    query: "",
    searchResult: [],
    submited: false,
    tabList: [],
    selectedTab: "추천 검색어"
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list': ListComponent,
    'tabs': TabComponent
  },
  created() {
    this.fetchKeyword();
  },
  methods: {
    onSubmit(query = '') {
      this.query = query;
      this.search();
    },
    onReset(e) {
      this.query = "";
      this.submited = false;
    },
    onKeyup(e) {
      if (!this.query.length) this.onReset();
    },
    setTabList(tab) {
      this.selectedTab = tab;
      this.keywordList = tab === "추천 검색어"
          ? this.fetchKeyword()
          : this.fetchHistory();
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
      SearchModel.list()
        .then((data) => {
          console.log(data);
          debugger;
          this.searchResult = data;
          this.selectedTab === "추천 검색어" ? null : this.fetchHistory();
          this.submited = true;
        })
        .catch(err => {
          console.log(err);
          debugger;
        });


    },
    fetchKeyword() {
      KeywordModel.list()
        .then((res) => {
          this.tabList = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchHistory() {
      HistoryModel.list()
        .then(res => {
          this.tabList = res;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
});