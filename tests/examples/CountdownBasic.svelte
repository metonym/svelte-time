<script>
  import { Countdown } from "svelte-time";

  const SECONDS = 20;

  let toDefault = $state(new Date(Date.now() + SECONDS * 1000));
  let toFormatted = $state(new Date(Date.now() + SECONDS * 1000));
</script>

<div>
  <!-- Ticks live by default, once per second -->
  <Countdown to={toDefault} />
  <button
    type="button"
    onclick={() => (toDefault = new Date(Date.now() + SECONDS * 1000))}
  >
    Reset
  </button>
</div>

<div>
  <!-- format hides hours until they're needed -->
  <Countdown
    to={toFormatted}
    format="mm:ss"
  />
  <button
    type="button"
    onclick={() => (toFormatted = new Date(Date.now() + SECONDS * 1000))}
  >
    Reset
  </button>
</div>
