/**
 * Accordion Fold
 *
 * Subcomponent of accordion
 */

/**
 * @section Template
 */

<template>
<div class="accordion-drawer" :class="{ 'is-collapsed': isCollapsed }" :aria-expanded="!isCollapsed">
  <button aria-role="tab" class="accordion-handle" @click="toggle" v-html="q"></button>
  <div aria-role="tabpanel" class="accordion-content" v-html="a"></div>
</div>
</template>

/**
 * @section Logic
 */

<script>
export default {
  props: {
    q: String,
    a: String,
  },
  data: function() {
    return { isCollapsed: true }
  },
  methods: {
    toggle: function() {
      return this.isCollapsed = !!!this.isCollapsed;
    },
  },
}
</script>
