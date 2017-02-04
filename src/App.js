/**
 * Lineage
 *
 * Primary entry point
 */

import Vue from 'vue';

import styles from './App.css';
import fonts from './Font.css';

import LineageHours from './components/LineageHours.vue';
import Siema from './components/Siema.vue';
import Product from './components/Product.vue';
import Stepper from './components/Stepper.vue';
import Wholesale from './containers/Wholesale.vue';

/**
 * @section App
 */

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
  components: {
    'lineage-hours': LineageHours,
    'v-carousel': Siema,
    'v-product': Product,
    'v-stepper': Stepper,
    'v-wholesale': Wholesale,
  },
});
