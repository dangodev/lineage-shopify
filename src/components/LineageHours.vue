/**
 * Lineage Hours
 * Store-specific hours of operation
 */

/**
 * @section Template
 */

<template>
  <div>
    <div class="hours-location">{{ location }}</div>
    <div class="hours-status" :class="{ 'is-open': status == 'Open', 'is-closing': status == 'Closing Soon', 'is-closed': status == 'Closed' }">{{ status }}</div>
  </div>
</template>

/**
 * @ section Logic
 */

<script>
export default {
  props: {
    open: Array,  // [Sunday, Monday, Tuesday…] in military time
    close: Array,
    holidays: Array, // 1125 = December 25, 0 = Jan 1
    location: String, // “East End Market”
  },
  data () {
    const status = this.getStatus();
    return { status };
  },
  methods: {
    getStatus: function() {
      const user = new Date();
      const userDate = `${user.getMonth()}${user.getDate()}`;

      // Check for holidays
      if(this.holidays.indexOf(userDate) >= 0) {
        return 'Closed';
      }

      // Check if open
      const timezoneOffset = 5; // EST = +5
      const userTZOffset = user.getTimezoneOffset() / 60;
      const TZDiff = timezoneOffset - userTZOffset;
      // Convert to EST
      const open = this.open[user.getDay()] + TZDiff;
      const close = this.close[user.getDay()] + TZDiff;
      // Compare user time to store time
      const userHours = user.getHours();
      const userMinutes = user.getMinutes() / 60;
      if((userHours + userMinutes) >= (close - 0.5) && userHours < close) {
        return 'Closing Soon';
      }
      else if(userHours >= open && userHours < close) {
        return 'Open';
      }
      return 'Closed';
    },
  },
}
</script>
