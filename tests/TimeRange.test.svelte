<script lang="ts">
  import { TimeRange } from "svelte-time";

  const START = "2024-01-05";
  const END = "2024-01-10T00:00:00.000Z";
</script>

<span data-test="default">
  <TimeRange
    start={START}
    end={END}
  />
</span>

<span data-test="custom-format">
  <TimeRange
    start={START}
    end={END}
    format="YYYY-MM-DD"
  />
</span>

<span data-test="custom-separator">
  <TimeRange
    start={START}
    end={END}
    separator=" to "
  />
</span>

<span data-test="locale">
  <TimeRange
    start={START}
    end={END}
    format="MMMM"
    locale="de"
  />
</span>

<span data-test="rest-props">
  <TimeRange
    start={START}
    end={END}
    class="range"
    data-foo="bar"
  />
</span>

<span data-test="children">
  <TimeRange
    start={START}
    end={END}
  >
    {#snippet children(formattedStart, formattedEnd, startDatetime, endDatetime)}
      <div data-test="children-start">{formattedStart}</div>
      <div data-test="children-end">{formattedEnd}</div>
      <div data-test="children-start-datetime">{startDatetime}</div>
      <div data-test="children-end-datetime">{endDatetime}</div>
    {/snippet}
  </TimeRange>
</span>
