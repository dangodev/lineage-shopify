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
import Stepper from './components/Stepper.vue';
import Wholesale from './containers/Wholesale';

/**
 * @section App
 */

const app = new Vue({
  el: '#vue-app',
  components: {
    'lineage-hours': LineageHours,
    'v-stepper': Stepper,
    'v-carousel': Siema,
    'v-wholesale': Wholesale,
  },
});
