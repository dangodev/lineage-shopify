/**
 * Lineage Hours
 * Store-specific hours of operation
 */

/**
 * @section Template
 */

<template>
  <div>
    <div class="hours-intro">Our coffee bar is</div>
    <div class="hours-status" :class="{ 'is-open': status == 'Open', 'is-closing': status == 'Closing Soon', 'is-closed': status == 'Closed' }">{{ status }}</div>
  </div>
</template>

/**
 * @ section Logic
 */

<script>
// Sunday = 0; times in military EST
const hours = {
  0: { open: 10, close: 18 },
  1: { open: 8, close: 19 },
  2: { open: 8, close: 19 },
  3: { open: 8, close: 19 },
  4: { open: 8, close: 19 },
  5: { open: 8, close: 19 },
  6: { open: 8, close: 19 },
};

// 1125 = December 25 (Jan = 0)
const holidays = [
  '1125',
];

export default {
  data () {
    const status = this.getStatus();
    return { status };
  },
  methods: {
    getStatus: function() {
      const user = new Date();
      const userDate = `${user.getMonth()}${user.getDate()}`;

      // Check for holidays
      if(holidays.indexOf(userDate) >= 0) {
        return 'Closed';
      }

      // Check if open
      const timezoneOffset = 5; // EST = +5
      const userTZOffset = user.getTimezoneOffset() / 60;
      const TZDiff = timezoneOffset - userTZOffset;
      const storeHours = hours[user.getDay()];
      // Convert to EST
      const open = storeHours.open + TZDiff;
      const close = storeHours.close + TZDiff;
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
