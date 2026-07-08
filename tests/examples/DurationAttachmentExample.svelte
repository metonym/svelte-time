<script>
  // biome-ignore lint/correctness/noUnusedImports: `duration` is used in the {@attach} directive below
  import { duration } from "svelte-time";
</script>

<time {@attach duration({ value: 3661000 })}></time>
