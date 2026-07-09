<script>
  import { Stopwatch } from "svelte-time";

  const since = new Date();
  let running = $state(true);
</script>

<Stopwatch
  {since}
  {running}
>
  {#snippet children(formatted, isRunning)}
    {formatted}
    {isRunning ? "(running)" : "(paused)"}
  {/snippet}
</Stopwatch>

<button
  type="button"
  onclick={() => (running = !running)}
>
  {running ? "Pause" : "Resume"}
</button>
