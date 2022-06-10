<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" :type="type" v-model="dataValue" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  name: 'BaseFormInput',
  props: {
    type: {
      type: String,
      default: 'text'
    }
  },
  mixins: [formFieldMixin]
};
</script>

<style scoped>

</style>
