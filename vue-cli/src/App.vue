<template>
  <div>
    <app-header 
      v-bind:propsdata="str"
      v-on:renew="changeHeader">
    </app-header>
    <p v-bind:class="isWarning">{{welcomeStr}}</p>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  data: function() {
    return {
      str: 'Hi',
      warning: false
    }
  },
  computed: {
    welcomeStr: function() {
      return this.str + ' Aredra!!'
    },
    isWarning: function() {
      return this.warning ? 'warning' : null
    }
  },
  components:  {
    'app-header': AppHeader
  },
  methods: {
    changeHeader: function () {
      this.str = 'Hellow';
      this.warning = !this.warning
    }
  }
}
</script>

<style>
  .warning {
      color: red
  }
</style>