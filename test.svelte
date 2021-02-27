<script lang="ts">
  import Time from "./types";
  import { svelteTime } from "./types";
  import { SvelteTimeOptions } from "./types/svelte-time";

  let timestamp = "2020/02/02";
  let formatted = "";

  const options: SvelteTimeOptions = {
    relative: true,
    timestamp: "",
    format: "",
  };
</script>

<Time timestamp="{timestamp}" format="mm/dd/yyyy" bind:formatted relative {...options} />

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
