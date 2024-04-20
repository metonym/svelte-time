<script lang="ts">
  import Time, { svelteTime } from "svelte-time";
</script>

<Time data-test="custom-title" relative title="Custom title" />

<Time data-test="custom-title-omit" relative title={undefined} />

<time
  data-test="action-custom-title"
  use:svelteTime={{
    title: "Custom title",
    relative: true,
  }}
/>

<time
  data-test="action-custom-title-omit"
  use:svelteTime={{
    title: undefined,
    relative: true,
  }}
/>
