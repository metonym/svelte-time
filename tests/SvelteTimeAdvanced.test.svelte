<script lang="ts">
  import Time from "svelte-time";
  import { dayjs } from "svelte-time";

  const invalidDate = "invalid";
  const futureDate = dayjs().add(2, "days").toISOString();
  const pastDate = dayjs().subtract(5, "years").toISOString();
  const currentDate = new Date().toISOString();
</script>

<!-- Edge Cases -->
<Time data-test="invalid-date" timestamp={invalidDate} />
<Time data-test="future-date" timestamp={futureDate} relative />
<Time data-test="far-past-date" timestamp={pastDate} relative />
<Time data-test="empty-timestamp" timestamp="" />

<!-- Custom Formatting -->
<Time
  data-test="custom-format-function"
  timestamp={currentDate}
  format="YYYY-MM-DD"
/>

<!-- Different Time Formats -->
<Time
  data-test="different-locale"
  timestamp={currentDate}
  format="DD [de] MMMM [de] YYYY"
/>

<!-- Multiple Format Patterns -->
<Time
  data-test="multiple-formats"
  timestamp={currentDate}
  format="MMM DD, YYYY"
/>
