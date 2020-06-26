export default {
  template: "#search-form",
  props: ['keyword'],
  data() {
    return {
      inputValue: this.keyword,
    };
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