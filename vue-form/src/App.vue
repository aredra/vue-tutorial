<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input id="username" type="text" v-model.trim="username">
    </div>
    <div>
      <label for="password">pw: </label>
      <input id="password" type="password" v-model.trim="password">
    </div>
    <button type="submit">login</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data: function() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    submitForm: function() {
  // event.preventDefault();
      if (this.username === '' || this.password === '') {
        throw Error('No data in UserName');
      }
      var url = 'https://jsonplaceholder.typicode.com/users'
      var data = {
        username: this.username,
        password: this.password
      }
      console.log(this.username, this.password);
      axios.post(url, data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style>

</style>