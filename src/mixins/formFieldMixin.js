import BaseFormField from '@/components/BaseFormField';

export default {
  components: { BaseFormField },
  props: {
    title: null,
    error: null,
    placeholder: null,
    value: ''
  },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
