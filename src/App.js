/**
 * Lineage
 *
 * Primary entry point
 */

import Vue from 'vue';
import axios from 'axios';
import scroll from 'scroll';

import styles from './App.css';
import fonts from './Font.css';

import Cart from './components/Cart.vue';
import CartPreview from './components/CartPreview.vue';
import LineageHours from './components/LineageHours.vue';
import Product from './components/Product.vue';
import Siema from './components/Siema.vue';
import Stepper from './components/Stepper.vue';
import Wholesale from './containers/Wholesale.vue';

/**
 * @section App
 */

const page = require('scroll-doc')();

// Global Filters

Vue.filter('cents', (val) => {
  const valString = val + '';
  return valString.slice(-2);
});
Vue.filter('dollars', (val) => Math.round(val / 100));
Vue.filter('inCents', (val) => (val / 100).toFixed(2));

// App wrapper

const app = new Vue({
  el: '#vue-app',
  data: {
    cart: { items: [] },
  },
  created() {
    this.updateCart();
  },
  components: {
    'lineage-hours': LineageHours,
    'v-carousel': Siema,
    'v-cart': Cart,
    'v-cart-preview': CartPreview,
    'v-product': Product,
    'v-stepper': Stepper,
    'v-wholesale': Wholesale,
  },
  methods: {
    updateCart(options = { scroll: false }) {
      axios.get('/cart.js').then(response => {
        this.cart = response.data;
        if (options.scroll) scroll.top(page, 0, { duration: 500 });
      });
    },
  },
});
