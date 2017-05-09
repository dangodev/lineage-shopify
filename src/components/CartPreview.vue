/**
 * Cart Preview
 * Preview popover
 */

/**
 * @section Template
 */

<template>
  <div class="nav-link nav-cart badge" @click.self="open">
    <div class="badge-count" v-if="cart.items.length > 0">{{ cart.items.length }}</div>
    <svg aria-label="Cart" class="icon icon--cart" role="img"><use xlink:href="#icon_cart"></use></svg>
    <div class="popover" :class="{ 'is-open': isOpen }">
      <div class="popover-inner">
        <a class="popover-item" href="/cart" v-for="item in cart.items">
          <h3>{{ item.title }}</h3>
          <h4>{{ item.quantity }}</h4>
        </a>
        <a href="/cart" class="popover-cta">View Cart</a>
      </div>
    </div>
    <div class="popover-overlay" @click="close"></div>
  </div>
</template>

/**
 * @section Logic
 */

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    document.addEventListener('keydown', (e) => e.keyCode === 27 ? this.close() : false);
  },
  props: {
    cart: Object,
  },
  methods: {
    close() {
      return this.isOpen = false;
    },
    open() {
      return this.isOpen = true;
    },
  },
};
</script>
