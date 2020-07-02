<template>
  <div>
    <div v-if="data.length">
        <ul class="list">
            <li v-for="(item, idx) in data" :key="idx" @click="onClickList(item.keyword)">
                <span v-if="getTab" class="number">{{idx+1}}</span>
                    {{item.keyword}}
                <span v-if="!getTab" class="date">{{item.date}}</span>
                <button v-if="!getTab" class="btn-remove" @click.stop="onClickRemoveList(item)"></button>
            </li>
        </ul>
    </div>
    <div v-else> {{}}가 없습니다. </div>
  </div>
</template>

<script>
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
</script>

<style>

</style>