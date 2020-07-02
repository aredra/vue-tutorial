<template>
    <div>
        <div v-if="data.length">
        <ul>
            <li v-for="(item, idx) in data" :key="idx">
                <img :src="item.image" alt=""> {{item.name}} </li>
        </ul>
        </div>
        <div v-else> {{query}} 검색어로 찾을 수 없습니다. </div>    
    </div>
</template>

<script>
export default {
    template: '#search-result',
    props: ['data', 'query']
}
</script>

<style>

</style>