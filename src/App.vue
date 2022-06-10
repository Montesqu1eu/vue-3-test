<template>
  <div class="main">
    <HeaderRegion/>
    <router-view></router-view>
    <FooterRegion/>
  </div>
</template>
<script>
import CartIndicator from '@/components/CartIndicator';
import { mapActions, mapMutations } from 'vuex';
import HeaderRegion from '@/components/HeaderRegion.veu';
import FooterRegion from '@/components/FooterRegion';

export default {
  components: {
    FooterRegion,
    HeaderRegion,
    CartIndicator
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey'])
  },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart();
  }
};

</script>
<style lang="scss">
@import "~@/scss/style.scss";
</style>
