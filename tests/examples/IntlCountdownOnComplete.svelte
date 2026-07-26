<script>
  import { Countdown } from "svelte-time/intl";

  let to = $state(new Date(Date.now() + 5000));
</script>

<Countdown
  {to}
  oncomplete={() => console.log("done!")}
>
  {#snippet children(formatted, done)}
    {done ? "Done!" : formatted}
  {/snippet}
</Countdown>
