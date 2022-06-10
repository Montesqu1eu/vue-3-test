import axios from 'axios';
import { API_BASE_URL } from '@/config';

export async function loadOrderInfo(context, orderId) {
  return await axios
    .get(API_BASE_URL + '/orders/' + orderId, {
      params: {
        userAccessKey: context.state.userAccessKey
      }
    })
    .then(response => {
      context.commit('updateOrderInfo', response.data);
    })

    ;
}

export async function loadCart(context) {
  await axios
    .get(API_BASE_URL + '/baskets', {
      params: {
        userAccessKey: context.state.userAccessKey
      }
    })
    .then(response => {
      if (!context.state.userAccessKey) {
        localStorage.setItem('userAccessKey', response.data.user.accessKey);
        context.commit('updateUserAccessKey', response.data.user.accessKey);
      }
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    });
}

export async function addProductToCart(context, {
  productId,
  amount
}) {
  return await axios
    .put(API_BASE_URL + '/baskets/products', {
      productId: productId,
      quantity: amount
    }, {
      params: {
        userAccessKey: context.state.userAccessKey
      }
    })
    .then(response => {
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    });
}

export async function updateCartProductAmount(context, {
  productId,
  amount
}) {
  context.commit('updateCartProductAmount', {  //updateCartProductAmount из мутаций
    productId,
    amount
  });

  if (amount < 1) return;

  return await axios
    .put(API_BASE_URL + '/baskets/products', {
      productId: productId,
      quantity: amount
    }, {
      params: {
        userAccessKey: context.state.userAccessKey
      }
    })
    .then(response => {
      context.commit('updateCartProductsData', response.data.items);
    })
    .catch(() => {
      context.commit('syncCartProducts');
    });
}

export async function deleteCartProductItem(context, productId) {
  context.state.cartProducts = context.state.cartProducts.filter(item => item.productId !== productId);

  await axios
    .delete(API_BASE_URL + '/baskets/products', {
      params: {
        userAccessKey: context.state.userAccessKey
      },
      data: {
        productId: productId
      }
    })
    .catch(error => {
      context.commit('updateCartProductsData', error.data.items);
    });
}
