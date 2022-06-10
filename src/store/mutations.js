export function updateCartProductAmount(state, {
  productId,
  amount
}) {
  const item = state.cartProducts.find(item => item.productId === productId);
  if (item) {
    item.amount = amount;
  }
}

export function deleteCartProduct(state, productId) {
  state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
}

export function updateUserAccessKey(state, accessKey) {
  state.userAccessKey = accessKey;
}

export function updateCartProductsData(state, items) {
  state.cartProductsData = items;
}

export function syncCartProducts(state) {
  state.cartProducts = state.cartProductsData.map(item => {
    return {
      productId: item.product.id,
      amount: item.quantity
    };
  });
}

export function resetCart(state) {
  state.cartProducts = [];
  state.cartProductsData = [];
}

export function updateOrderInfo(state, orderInfo) {
  state.orderInfo = orderInfo;
}
