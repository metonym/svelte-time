<script lang="ts">
  import Time from "../types";
  import { svelteTime } from "../types";
  import { SvelteTimeOptions } from "../types/svelte-time";

  let timestamp = "2020/02/02";
  let formatted = "";

  const options: SvelteTimeOptions = {
    timestamp: "",
    format: "",
    relative: true,
    live: true,
  };
</script>

<!-- svelte-ignore missing-declaration -->
<Time
  timestamp="{timestamp}"
  format="mm/dd/yyyy"
  bind:formatted
  relative
  live="{60000}"
  {...options}
/>

<!-- svelte-ignore missing-declaration -->
<time use:svelteTime></time>

<!-- svelte-ignore missing-declaration -->

<time
  use:svelteTime="{{
    timestamp: '2021-02-02',
    format: 'dddd @ h:mm A · MMMM D, YYYY',
  }}"
>
</time>

<!-- svelte-ignore missing-declaration -->
<time
  class="classname"
  use:svelteTime="{{
    relative: true,
    live: true,
    timestamp: '2021-02-02',
  }}"
>
</time>
