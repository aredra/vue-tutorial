export default {
  template: "#search-form",
  props: ['keyword'],
  data() {
    return {
      inputValue: this.keyword,
    };
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.inputValue.trim());
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