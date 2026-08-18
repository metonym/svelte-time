<script lang="ts">
  import { time } from "svelte-time";
</script>

<time
  data-test="attachment-custom-title"
  {@attach time({
    relative: true,
    timestamp: "2021-02-02",
    title: "Custom title",
  })}
></time>

<time
  data-test="attachment-custom-title-omit"
  {@attach time({
    relative: true,
    timestamp: "2021-02-02",
    title: undefined,
  })}
></time>
