<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
    </div>

    <div class="content__catalog">
      <product-filter
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
      />
      <section class="catalog">
        <loader v-if="productsLoading" object="#000000" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="circular"></loader>
        <div v-if="productsLoadingFailed">Ошибка загрузки.
          <button @click.prevent="loadProducts">Поробовать ещё раз</button>
        </div>
        <product-list :products="products"/>
        <base-pagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false
    };
  },
  computed: {
    products() {
      return this.productsData ?
        this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url
          };
        })
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + '/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            colorId: this.filterColorId,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          }
        })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false)
        ;
      }, 0);
    }
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>

<style scoped></style>

