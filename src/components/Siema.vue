/**
 * Carousel
 * Home page slider
 */

/**
 * @section Template
 */

<template>
  <div class="has-siema">
    <div class="siema">
      <div class="siema-slide" v-for="slide in slides" :class="slide.color">
        <img :src="slide.image">
        <a class="button siema-button" :href="slide.link">
          <div class="button-inner">{{ slide.cta }}</div>
        </a>
      </div>
    </div>
    <div class="siema-marker">
      <div v-for="(slide, index) in slides" :class="{ 'is-active': isActiveSlide(index) }"/>
    </div>
  </div>
</template>

/**
 * @section Logic
 */

<script>
  import Siema from 'siema';

  export default {
    data() {
      return {
        activeSlide: 0,
      };
    },
    props: {
      auto: Number,
      slides: Array,
    },
    methods: {
      isActiveSlide(num) {
        if(!this.siema) return false;
        return this.siema.currentSlide === num;
      },
    },
    mounted() {
      this.siema = new Siema({
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        loop: true,
      });
      window.vue = this;
    },
  };
</script>
