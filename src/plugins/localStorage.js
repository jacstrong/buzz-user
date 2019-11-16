const localStorage = store => {
  // called when the store is initialized
  // if (window.localStorage.cart) {
  //   store.commit('setCart', JSON.parse(window.localStorage.getItem('cart')))
  // }

  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    if (mutation.type === 'addItemToCart') {
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
    if (mutation.type === 'removeItemFromCart') {
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
    if (mutation.type === 'cartQuantityAdd' || mutation.type === 'quantitySub') {
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
    if (mutation.type === 'cartQuantitySub' || mutation.type === 'quantitySub') {
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
    // if (mutation.type === 'setStoreData') {
    //   if (state.storeID !== window.localStorage.getItem('storeID')) {
    //     window.localStorage.removeItem('cart')
    //     store.commit('setCart', [])
    //   }
    //   window.localStorage.setItem('storeID', state.storeID)
    // }
    if (mutation.type === 'clearCart') {
      window.localStorage.removeItem('cart')
      window.localStorage.removeItem('storeID')
    }
    
    
  })
}

export default localStorage
