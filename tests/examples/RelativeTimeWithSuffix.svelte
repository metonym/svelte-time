<script lang="ts">
  import Time, { dayjs } from "svelte-time";

  const pastDate = dayjs().subtract(2, "days").toISOString();
  const futureDate = dayjs().add(2, "days").toISOString();
</script>

<div>
  <Time relative timestamp={pastDate} />
</div>

<div>
  <Time relative timestamp={pastDate} withoutSuffix />
</div>

<div>
  <Time relative timestamp={futureDate} />
</div>

<div>
  <Time relative timestamp={futureDate} withoutSuffix />
</div>
