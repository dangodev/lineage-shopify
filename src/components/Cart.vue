/**
 * Cart
 * Manage purchases
 */

/**
 * @section template
 */

<template>
  <div class="cart">
    <div class="cart-zero" v-if="!cart.items">
      <blockquote>{{ quote[0] }}<cite>{{ quote[1] }}</cite></blockquote>
      Nothing in the cart.
    </div>
    <template v-else>
      <div class="cart-item" v-for="(item, index) in cart.items" :class="{ 'is-deleted': item.quantity <= 0 }">
        <div class="cart-icon">
          <svg aria-label="Coffee" class="icon icon--bag" role="img"><use xlink:href="#icon_bag"></use></svg>
        </div>
        <a class="cart-name" :href="item.url">
          <h2>{{ item.title }}</h2>
          <h3>View Info</h3>
        </a>
        <div class="cart-price"><small>Price</small>${{ item.price | inCents }}</div>
        <div class="cart-actions">
          <small>Quantity</small>
          <button type="button" class="stepper-button" @click="decrement(index)">−</button>
          <input type="number" class="stepper" @change="updateQuantity($event, index)" :value="item.quantity">
          <button type="button" class="stepper-button" @click="increment(index)">+</button>
          <div class="cart-warn" v-if="item.quantity <= 0">Removed. <a @click="increment(index)">Undo</a></div>
        </div>
      </div>
      <div class="cart-discounts">
        <h2>Discounts</h2>
        – ${{ cart.total_discount | inCents }}
      </div>
      <div class="cart-summary">
        <h2>Total</h2>
        <div v-if="isLoading" class="cart-spinner spinner"></div>
        ${{ cart.total_price | inCents }}
      </div>
      <div class="cart-colophon">
        Price before tax & shipping.
        <br/>
        <br/>
        You’ll be able to enter promo codes (if
        any) and shipping info on the next screen.
      </div>
      <div class="cart-note">
        <label for="note">Note for the seller:</label>
        <textarea id="note" @change="queueUpdate" placeholder="Give us special instructions, or just say hi! 👋" v-model="cart.note"></textarea>
      </div>
      <div class="cart-checkout">
        <button type="submit" class="button"><span class="button-inner">Check Out</span></button>
      </div>
    </template>
  </div>
</template>

/**
 * @section Logic
 */

<script>
import axios from 'axios';
import _debounce from 'lodash/debounce';

export default {
  data() {
    return {
      cart: {},
      isLoading: false,
      quoteBank: [
        ['Coffee makes us severe, and grave, and philosophical.', 'Jonathan Swift'],
        ['If it weren’t for the coffee, I’d have no identifiable personality whatsoever.', 'David Letterman'],
        ['Good communication is just as stimulating as black coffee, and just as hard to sleep after.', 'Anne Morrow Lindbergh'],
        ['I’d rather take coffee than compliments.', 'Louisa May Alcott'],
        ['As long as there was coffee in the world, how bad could things be?', 'Cassandra Clare']
        ['Coffee is a way of stealing time that should by rights belong to your older self.', 'Terry Pratchet'],
        ['Life’s too short to drink crappy coffee and cry over boys who don’t care.', 'Anonymous']
      ],
      quote: '',
    };
  },
  created() {
    document.addEventListener('keydown', (e) => e.keyCode === 13 ? false : true);
    const max = this.quoteBank.length;
    const random = Math.floor(Math.random() * max);
    this.quote = this.quoteBank[random];
  },
  props: {
    inheritedCart: Object,
  },
  methods: {
    decrement(index) {
      let oneFewer = this.cart.items[index].quantity - 1;
      if(oneFewer < 0) oneFewer = 0;
      this.$set(this.cart.items[index], 'quantity', oneFewer);
      this.queueUpdate();
    },
    increment(index) {
      const oneMore = this.cart.items[index].quantity + 1;
      this.$set(this.cart.items[index], 'quantity', oneMore);
      this.queueUpdate();
    },
    updateQuantity(e, index) {
      const newQuantity = parseInt(e.target.value);
      this.$set(this.cart.items[index], 'quantity', newQuantity);
      this.queueUpdate();
    },
    queueUpdate: _debounce(function() { this.updateCart() }, 500),
    updateCart() {
      this.isLoading = true;
      const newQuantities = { updates: { }, note: this.cart.note };
      this.cart.items.forEach(item => newQuantities.updates[item.id] = item.quantity);
      axios.post('/cart/update.js', newQuantities).then((response) => {
        this.$set(this.cart, 'items', response.data.items);
        this.$set(this.cart, 'total_discount', response.data.total_discount);
        this.$set(this.cart, 'total_price', response.data.total_price);
        this.isLoading = false;
      });
    },
  },
  watch: {
    inheritedCart(val) {
      this.cart = val;
    },
  },
};
</script>
