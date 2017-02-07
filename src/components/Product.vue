/**
 * Product
 * Markup for product page
 */

<template>
  <div>
    <fieldset class="well" v-if="productType == 'coffee-beans'">
      <legend>Size</legend>
      <div class="switchboard switchboard--light">
        <template v-for="(variant, index) in product.variants">
          <input
            :disabled="variant.available == false"
            :id="`option_${index}`"
            :value="variant.id"
            class="switchboard-switch"
            name="product_variants"
            type="radio"
            v-model="selectedVariant"
          >
          <label :for="`variant_${index}`" class="switchboard-label">
            <template v-if="variant.title == '12oz'">
              <div><svg aria-label="12oz Bag" class="icon icon--bag" role="img"><use xlink:href="#icon_bag"></use></svg></div>
              {{ variant.title }}<small class="mt025">Individual / Family</small>
            </template>
            <template v-else-if="variant.title == '5lb'">
              <div><svg aria-label="5lb Bag" class="icon icon--bag" role="img"><use xlink:href="#icon_wholesale"></use></svg></div>
              {{ variant.title }}<small class="mt025">Wholesale</small>
            </template>
          </label>
        </template>
      </div>
    </fieldset>

    <fieldset class="well" v-if="productType == 'coffee-subscription'">
      <legend>Deliver 1 bag every:</legend>
      <div class="switchboard">
        <template v-for="(variant, index) in product.variants" v-if="">
          <input
            :id="`variant_${index}`"
            :value="variant.id"
            class="switchboard-switch"
            name="product_variants"
            type="radio"
            v-model="selectedVariant"
          >
          <label :for="`variant_${index}`" class="switchboard-label">
            {{ index + 1 }}
            <small v-if="index === 0">week</small>
            <small v-else>weeks</small>
          </label>
        </template>
      </div>
    </fieldset>

    <fieldset class="well" v-if="productType != 'coffee-subscription'">
      <legend>Quantity</legend>
      <div class="switchboard">
        <template v-for="i in maxQuantity">
          <input
            :id="`quantity_${i}`"
            :value="i"
            class="switchboard-switch"
            name="quantity"
            type="radio"
            v-model="quantity"
          >
          <label :for="`quantity_${i}`" class="switchboard-label">
            {{ i }}
            <template v-if="productType == 'coffee-beans' || productType == 'coffee-subscription'">
            <small v-if="i === 1">bag</small>
            <small v-else>bags</small>
            </template>
          </label>
        </template>
      </div>
    </fieldset>

    <div class="well well--l tac">
      <span class="price">
        <span class="price-amount" :content="price | inCents" itemprop="price">
          <span class="price-currency" content="USD" itemprop="priceCurrency">$</span>
          <span class="price-dollars">{{ price | dollars }}</span>
          <span class="price-cents">{{ price | cents }}</span>
        </span>
        <span class="price price--og" v-if="isSale">
          <span class="price-amount">
            <span class="price-currency">$</span>
            <span class="price-dollars">{{ compareAtPriceMax | dollars }}</span>
            <span class="price-cents">{{ compareAtPriceMax | cents }}</span>
          </span>
        </span>
        <div class="price-status" v-if="selectedAvailable == false">Out of Stock</div>
      </span>
    </div>

    <div class="well well--l tac">
      <button class="button button--l" :disabled="selectedAvailable == false" @click="add">
        <span class="button-inner">Add To Cart</span>
      </button>
    </div>
  </div>
</template>

/**
 * @section Logic
 */

<script>
import axios from 'axios';
import QueryString from 'query-string';

export default {
  data() {
    return {
      compareAtPriceMax: 0,
      isSale: false,
      maxQuantity: 5,
      price: 0,
      product: {},
      quantity: 1,
      selectedAvailable: true,
      selectedVariant: '',
    };
  },
  props: {
    productType: String,
  },
  beforeCreate() {
    const pathname = window.location.pathname.split('/');
    const handle = pathname[pathname.length - 1];
    axios.get(`/products/${handle}.js`).then((response) => {
      this.product = response.data;

      const query = QueryString.parse(window.location.search);
      this.selectedVariant = query.variant ? parseInt(query.variant) : this.product.variants[0].id;
    });
  },
  watch: {
    selectedVariant(val) {
      if(!this.product.variants) return false;

      const variant = this.product.variants.filter(option => option.id === val);

      if(!variant) return false;

      this.price = variant[0].price;
      this.compareAtPriceMax = variant[0].compare_at_price_max;
      this.selectedAvailable = variant[0].available;
      this.isSale = variant[0].compare_at_price_max > 0 && variant[0].price > variant[0].compare_at_price_max;
      this.updateURL();
    },
  },
  methods: {
    add() {
      const data = {
        id: this.selectedVariant,
        quantity: this.quantity,
      };
      axios.post('/cart/add.js', data).then((response) => {
        console.log(`Added ${this.quantity} ${this.product.title} to cart! 🎉`);
        this.$parent.$options.methods.updateCart({ scroll: true });
      });
    },
    updateURL() {
      const state = { variant: this.selectedVariant };
      window.history.replaceState(
        state,
        this.selectedVariant,
        `${window.location.pathname}?${QueryString.stringify(state)}`,
      );
    },
  },
}
</script>
