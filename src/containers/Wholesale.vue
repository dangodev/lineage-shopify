/**
 * Wholesale
 * Wholesale FAQs
 */

/**
 * @section Template
 */

<template>
  <v-accordion folds="folds">
</template>


/**
 * @section Logic
 */

<script>
  import Accordion from '../components/Accordion.vue';

  const folds = [
    {
      q: 'How am I billed?',
      a: '<p>It’s a flat rate for coffee + shipping, and we only bill your credit card when a shipment is on the way. Every now and then we even ship specialty roasts that are more expensive than what you pay, at no cost to you!</p>',
    },
    {
      q: 'What can I expect to pay?',
      a: '<p>Coffee beans can be very different prices. Not because some are magic, but because we source them from all over the world, and with each unique source comes its own unique challenges in transporting the beans stateside. We work with you and your budget and personal tastes. We’re certain you can’t get better coffee at a more honest price, whatever you decide.</p>',
    },
    {
      q: 'When can I cancel / change a shipment?',
      a: '<p>We order and prep every Saturday, so let us know by <strong>5pm</strong> on Friday if you want to cancel or change your weekly order.</p>',
    },
    {
      q: 'Is there a minimum commitment?',
      a: '<p>Nope. Our relationships speak for themselves, and we’ve maintained our good reputation with our wholesale clients just because we treat it like a <em>relationship</em>.</p>',
    },
  ];

  export default {
    data: function() {
      return {
        folds: folds,
      };
    },
    components: {
      'v-accordion': Accordion,
    },
  }
</script>
