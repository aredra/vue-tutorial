export default {
  template: "#search-form",
  props: ['keyword'],
  data() {
    return {
      inputValue: this.keyword,
    };
  },
  watch: {
    keyword(newVal, oldVal) {
      this.inputValue = newVal !== oldVal ? newVal : oldVal;
    }
  },
  methods: {
    onEnter() {
      this.$emit('search', this.inputValue.trim());
    },
    onReset() {
      this.inputValue = "";
      this.$emit('reset');
    },
    onKeyup() {
      if (!this.inputValue.length) this.onReset();
    },
  },
};