<template>
  <div>
    <ul class="tabs">
        <li v-for="(tab, idx) in tabs" :key="idx" :class="{active: tab === selectedTab}" @click.stop="onClickTab(tab)">
            {{tab}} </li>
    </ul>
  </div>
</template>

<script>
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
</script>

<style>

</style>