<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled': page==1}"
        :disabled="page==1"
        aria-label="Предыдущая страница"
        @click="paginate(page - 1)"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </button>
    </li>
    <li
      v-for="pageNumber in pages"
      :key="pageNumber"
      class="pagination__item"
    >
      <a
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current': pageNumber===page}"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <button
        class="pagination__link pagination__link--arrow"
        aria-label="Следующая страница"
        :disabled="page===pages"
        :class="{'pagination__link--disabled': page==pages}"
        @click="paginate(page + 1)"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BasePagination',
  model: {
    prop: 'page',
    event: 'paginate',
  },
  props: ['page', 'count', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
  },
};
</script>

<style scoped>

</style>
