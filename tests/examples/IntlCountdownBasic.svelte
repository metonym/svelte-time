<script>
  import { Countdown } from "svelte-time/intl";

  let to = $state(new Date(Date.now() + 20_000));
</script>

<!-- Ticks live by default, once per second -->
<Countdown {to} />

<!-- style="long" gives a humanized readout -->
<Countdown
  {to}
  style="long"
/>

<!-- Changing `to` restarts the countdown -->
<button
  type="button"
  onclick={() => (to = new Date(Date.now() + 20_000))}
>
  Reset
</button>
