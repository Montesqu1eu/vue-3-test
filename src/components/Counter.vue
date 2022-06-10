<template>
  <div class="form__counter">
    <button
      type="button"
      aria-label="Убрать один товар"
      @click="countMinus"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-minus"/>
      </svg>
    </button>

    <input
      type="text"
      :value="counter"
      @input="onInput"
    >

    <button
      type="button"
      aria-label="Добавить один товар"
      @click="countPlus"
    >
      <svg
        width="12"
        height="12"
        fill="currentColor"
      >
        <use xlink:href="#icon-plus"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 99,
    },
    defaultNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      counter: this.defaultNum,
    };
  },
  methods: {
    countPlus() {
      if (this.counter < this.max) this.counter++;
      this.$emit('update', this.counter);
    },
    countMinus() {
      if (this.counter > this.min) this.counter--;
      this.$emit('update', this.counter);
    },
    onInput(event) {
      this.$emit('update', event.target.value);
    }
  }
};
</script>

<style scoped>

</style>
