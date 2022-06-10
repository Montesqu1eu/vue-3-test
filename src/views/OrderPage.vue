<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'cart' }" class="breadcrumbs__link">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormInput
              placeholder="Введите ваше полное имя"
              title="ФИО"
              v-model="formData.name"
              :error="formError.name"
            />

            <BaseFormInput
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
              v-model="formData.address"
              :error="formError.address"
            />

            <BaseFormInput
              placeholder="Введите ваш телефон"
              title="Телефон"
              v-model="formData.phone"
              :error="formError.phone"
            />

            <BaseFormInput
              placeholder="Введи ваш Email"
              title="Email"
              v-model="formData.email"
              :error="formError.email"
            />

            <BaseFormTextarea
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
              v-model="formData.comment"
              :error="formError.comment"
            />
          </div>

        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="(item,index) in products" :key="index">
              <h3>{{ item.product.title }}
                <div>x {{ item.amount }}</div>
              </h3>
              <b>{{ item.product.price * item.amount | numberFormat }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormField from '@/components/BaseFormField';
import BaseFormInput from '@/components/BaseFormInput';
import BaseFormTextarea from '@/components/BaseFormTextarea';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'OrderPage',
  components: {
    BaseFormField,
    BaseFormInput,
    BaseFormTextarea
  },
  filters: {
    numberFormat
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: ''
    };
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';

      axios
        .post(API_BASE_URL + '/orders', {
          ...this.formData
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(response => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id }
          });
        })
        .catch(error => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    }
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice'
    }),
  }
};
</script>

<style scoped>

</style>
