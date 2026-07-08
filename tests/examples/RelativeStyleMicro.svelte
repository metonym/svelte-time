<script>
  import Time, { dayjs } from "svelte-time";

  const pastDate = dayjs().subtract(4, "days").toISOString();
</script>

<div>
  <Time
    relative
    timestamp={pastDate}
  />
</div>

<div>
  <Time
    relative
    relativeStyle="micro"
    timestamp={pastDate}
  />
</div>
