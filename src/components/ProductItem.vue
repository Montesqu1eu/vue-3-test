<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{name: 'product', params:{ id: product.id} }"
    >
      <img
        :src="product.image"
        :alt="product.title"
      >
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price | numberFormat }} Р
    </span>

    <ul class="colors colors--black">
      <li
        v-for="color in product.colors"
        :key="color.id"
        class="colors__item"
      >
        <label class="colors__label">
          <input
            v-model="color.id"
            class="colors__radio sr-only"
            type="radio"
            value="#73B6EA"
            name="color"
          >
          <span
            class="colors__value"
            :style="{'background-color': color.code}"
          />
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'ProductItem',
  props: ['product'],
  filters: {
    numberFormat
  },
};
</script>

<style>

</style>
