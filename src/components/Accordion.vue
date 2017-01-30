/**
 * Accordion
 *
 * Expandable content. Multi-select tabs.
 */

/**
 * @section Template
 */

<template>
<div class="accordion" aria-role="tablist" multiselectable="true">
  <accordion-fold v-for="fold in folds" :q="fold.q" :a="fold.a"></accordion-fold>
</div>
</template>

/**
 * @ section Logic
 */

<script>
import AccordionFold from '../components/AccordionFold.vue';

export default {
  props: {
    folds: Array,
  },
  components: { AccordionFold },
}
</script>
