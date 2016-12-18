/**
 * Home
 *
 * Home page JS
 */

import Vue from 'vue';
import LineageHours from 'components/LineageHours.vue';
import { Swipe, SwipeItem } from 'vue-swipe';

Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

const app = new Vue({
  el: '#vue-home',
  components: {
    'lineage-hours': LineageHours,
  }
});
