<template>
  <form @submit.prevent>
    <input
      v-model="inputValue"
      @keypress.enter.stop="onEnter"
      @keyup="onKeyup"
      type="text"
      placeholder="검색어를 입력하세요"
      autofocus
    />
    <button
      v-show="inputValue.length"
      @click="onReset"
      type="reset"
      class="btn-reset"
    ></button>
  </form>
</template>

<script>
export default {
  template: "#search-form",
  props: ["keyword"],
  data() {
    return {
      inputValue: this.keyword
    };
  },
  watch: {
    keyword(newVal, oldVal) {
      this.inputValue = newVal !== oldVal ? newVal : oldVal;
    }
  },
  methods: {
    onEnter() {
      this.$emit("search", this.inputValue.trim());
    },
    onReset() {
      this.inputValue = "";
      this.$emit("reset");
    },
    onKeyup() {
      if (!this.inputValue.length) this.onReset();
    }
  }
};
</script>

<style></style>
