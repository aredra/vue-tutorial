<template>
  <header>
      <h1>{{propsdata}}</h1>
      <button v-on:click="sendEmit">Send</button>
  </header>
</template>

<script>
export default {
    props: ['propsdata'],
    methods: {
        sendEmit: function() {
            this.$emit('renew');
        }
    }
}
</script>

<style>

</style>