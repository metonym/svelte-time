<script>
  import { dayjs, TimeRange } from "svelte-time";

  const start = "2024-06-05T08:00:00";
  const end = "2024-06-05T10:00:00";
</script>

<!-- Condensed: date once, time on each side -->
<TimeRange
  {start}
  {end}
>
  {#snippet children({ startDatetime, endDatetime })}
    <time datetime={startDatetime}>{dayjs(start).format("MMM D, h:mm A")}</time>
    –
    <time datetime={endDatetime}>{dayjs(end).format("h:mm A")}</time>
  {/snippet}
</TimeRange>
<!-- Output: "Jun 5, 8:00 AM – 10:00 AM" -->