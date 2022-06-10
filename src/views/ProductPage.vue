<template>
  <loader v-if="productLoading" object="#000000" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="circular"></loader>
  <main class="content container" v-else-if="!productData">Загрузка не удалась</main>

  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main'}"
          >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main'}"
          >
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image"
            :srcset="product.image + ' 2x'"
            alt="Название товара"
          >
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="addToCart"
          >
            <b class="item__price">
              {{ product.price | numberFormat }} Р
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">
                Цвет:
              </legend>
              <ul class="colors">
                <li class="colors__item" v-for="(item,index) in productData.colors" :key="index">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      value="blue"
                      checked=""
                    >
                    <span
                      class="colors__value"
                      :style="{'background-color' : item.code}"
                    />
                  </label>
                </li>

              </ul>
            </fieldset>

            <div class="item__row">
              <Counter @update="updateAmount"/>
              <button
                class="button button--primery"
                type="submit"
                :disabled="productAddSending"
              >
                В корзину
              </button>
              <div v-show="productAdded">Товар добавлен в корзину</div>
              <div v-show="productAddSending">Добавляем товар в корзину...</div>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a
              class="tabs__link"
              href="#"
            >
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Данные отсутствуют
          </p>


        </div>
      </div>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import Counter from '@/components/Counter';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  components: { Counter },
  filters: {
    numberFormat,
  },
  data() {
    return {
      productAmount: 1,
      productData: null,

      productLoading: false,
      productLoadingFailed: false,

      productAdded: false,
      productAddSending: false

    };
  },
  computed: {
    product() {
      this.productData.image = this.productData.image.file.url;
      return this.productData;
    },
    category() {
      return this.productData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart', 'updateCartProductAmount']),
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      const exist = this.$store.state.cartProductsData.find(item => item.product.id === this.product.id);
      if (!exist) {
        this.addProductToCart(
          {
            productId: this.product.id,
            amount: this.productAmount
          }
        )
          .then(() => {
            this.productAdded = true;
            this.productAddSending = false;
          });
      } else {
        this.updateCartProductAmount({
          productId: this.product.id,
          amount: this.productAmount
        })
          .then(() => {
            this.productAdded = true;
            this.productAddSending = false;
          });
        ;
      }
    },
    updateAmount(amount) {
      this.productAmount = amount;
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      axios.get(API_BASE_URL + '/products/' + this.$route.params.id)
        .then(response => this.productData = response.data)
        .catch(error => {
          if (error.response.status === 404) {
            this.$router.push({ name: 'notfound' });
          } else {
            this.productLoadingFailed = true;
          }
        })
        .finally(() => this.productLoading = false);
    }
  },
  // created() {
  //   this.loadProduct();
  // },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true
    }
  }
};
</script>

<style scoped>

</style>
