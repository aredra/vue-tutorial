<template>
  <div>
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form
        :keyword="query"
        @search="onSubmit"
        @reset="onReset"
      ></search-form>

      <div v-if="submited">
        <search-result :data="searchResult"  :query="query"></search-result>
      </div>

      <div v-else>
        <tabs :selected-tab="selectedTab" @click:tab="setTabList"></tabs>
        <div>
            <list :data="tabList" :curr-tab="selectedTab" @click:list="onClickKeyword"
                @btn:remove="onClickRemoveHistory"></list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchModel from "../models/SearchModel.js";
import HistoryModel from "../models/HistoryModel.js";
import KeywordModel from "../models/KeywordModel.js";

import SearchForm from "./components/FormComponent";
import SearchResult from "./components/ResultComponent";
import List from "./components/ListComponent";
import Tabs from "./components/TabComponent";

export default {
  name: "app",
  components: {
    SearchForm,
    SearchResult,
    List,
    Tabs,
  },
  data() {
    return {
      query: "",
      searchResult: [],
      submited: false,
      tabList: [],
      selectedTab: "추천 검색어"
    };
  },
  created() {
    this.fetchKeyword();
  },
  methods: {
    onSubmit(query = "") {
      this.query = query;
      this.search();
    },
    onReset() {
      this.query = "";
      this.submited = false;
    },
    onKeyup() {
      if (!this.query.length) this.onReset();
    },
    setTabList(tab) {
      this.selectedTab = tab;
      this.keywordList =
        tab === "추천 검색어" ? this.fetchKeyword() : this.fetchHistory();
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
        .then(data => {
          console.log(data);
          debugger;
          this.searchResult = data;
          this.selectedTab === "추천 검색어" ? null : this.fetchHistory();
          this.submited = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchKeyword() {
      KeywordModel.list()
        .then(res => {
          this.tabList = res;
        })
        .catch(err => {
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
        });
    }
  }
};
</script>

<style></style>
