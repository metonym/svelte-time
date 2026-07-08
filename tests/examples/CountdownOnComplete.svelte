<script>
  import { Countdown } from "svelte-time";

  const SECONDS = 5;

  let to = $state(new Date(Date.now() + SECONDS * 1000));
  let completedCount = $state(0);

  function reset() {
    to = new Date(Date.now() + SECONDS * 1000);
  }
</script>

<Countdown
  {to}
  oncomplete={() => completedCount++}
>
  {#snippet children(formatted, done)}
    {done ? "Done!" : formatted}
  {/snippet}
</Countdown>

<p>oncomplete fired: {completedCount} time(s)</p>
<button
  type="button"
  onclick={reset}
>
  Reset
</button>
