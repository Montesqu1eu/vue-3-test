<template>
  <main class="content container" v-if="order">
    <div class="content__top">


      <h1 class="content__title">
        Заказ оформлен <span>№ {{ order.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ order.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ order.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ order.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ order.email }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="(item,index) in order.basket.items" :key="index">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Итого: <b>{{ order.basket.items.length }}</b> товара на сумму <b>{{ order.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'OrderInfoPage',
  filters: {
    numberFormat
  },
  computed: {
    order() {
      return this.$store.state.orderInfo;
    },
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice'
    }),
  },
  watch: {
    '$route.params.id': {
      handler() {
        // if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) return;
        this.$store.dispatch('loadOrderInfo', this.$route.params.id)
          .catch(
            () => this.$router.push({ name: 'notfound' })
          );
      },
      immediate: true
    }
  }
};
</script>

<style scoped>

</style>
