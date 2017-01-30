/**
 * Stepper
 *
 * Increment/decrement buttons
 */

/**
 * @section Logic
 */

<script>
export default {
  data () {
    return {
      quantity: 0,
    };
  },

  methods: {
    decrement: function() {
      this.quantity--;
    },

    increment: function() {
      this.quantity++;
    },
  },
}
</script>
