<script lang="ts">
  import "dayjs/locale/de"; // German
  import Time from "svelte-time";
</script>

<!-- Compact "micro" style -->
<Time
  data-test="micro"
  relative
  relativeStyle="micro"
  timestamp="2023-12-28T00:00:00.000Z"
  format="MMM DD, YYYY"
/>

<!-- relativeStyle="micro" ignores locale — English unit letters regardless -->
<Time
  data-test="micro-german-locale"
  relative
  relativeStyle="micro"
  locale="de"
  timestamp="2023-12-28T00:00:00.000Z"
  format="MMM DD, YYYY"
/>

<!-- relativeStyle="micro" without relative: no-op, renders absolute format -->
<Time
  data-test="micro-without-relative"
  relativeStyle="micro"
  timestamp="2023-12-28T00:00:00.000Z"
  format="MMM DD, YYYY"
/>

<!-- relativeStyle="default" (explicit) -->
<Time
  data-test="default-style"
  relative
  relativeStyle="default"
  timestamp="2023-12-28T00:00:00.000Z"
  format="MMM DD, YYYY"
/>

<!-- relativeStyle omitted -->
<Time
  data-test="omitted-style"
  relative
  timestamp="2023-12-28T00:00:00.000Z"
/>

<!-- relativeStyle={undefined} -->
<Time
  data-test="undefined-style"
  relative
  relativeStyle={undefined}
  timestamp="2023-12-28T00:00:00.000Z"
/>

<!-- relativeStyle is an unrecognized string -->
<Time
  data-test="unknown-style"
  relative
  relativeStyle="bogus"
  timestamp="2023-12-28T00:00:00.000Z"
/>
