<script>
  import { dayjs } from "svelte-time";

  let timestamp = $state("");
</script>

<button
  type="button"
  onclick={() => (timestamp = dayjs().format("HH:mm:ss.SSSSSS"))}
>
  Update {timestamp}
</button>
