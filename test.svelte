<script lang="ts">
  import Time from "./types";
  import { svelteTime } from "./types";

  let timestamp = "2020/02/02";
  let formatted = "";
</script>

<Time timestamp="{timestamp}" format="mm/dd/yyyy" bind:formatted relative />

<time use:svelteTime></time>

<time
  use:svelteTime="{{
    timestamp: '2021-02-02',
    format: 'dddd @ h:mm A · MMMM D, YYYY',
  }}"></time>

<time
  use:svelteTime="{{
    relative: true,
    timestamp: '2021-02-02',
  }}"></time>
