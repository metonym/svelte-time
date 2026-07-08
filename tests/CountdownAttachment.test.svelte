<script lang="ts">
  // biome-ignore lint/correctness/noUnusedImports: `countdown` is used in the {@attach} directives below
  import { countdown } from "svelte-time";

  // biome-ignore lint/correctness/noUnusedVariables: `oncomplete` is used in the {@attach} directive below
  const { oncomplete }: { oncomplete?: () => void } = $props();
</script>

<time
  data-test="basic"
  {@attach countdown({ to: new Date(Date.now() + 5 * 60 * 1000), live: false })}
></time>

<time
  data-test="format-mm-ss"
  {@attach countdown({
    to: new Date(Date.now() + 5 * 60 * 1000),
    format: "mm:ss",
    live: false,
  })}
></time>

<time
  data-test="humanize"
  {@attach countdown({
    to: new Date(Date.now() + 5 * 60 * 1000),
    humanize: true,
    withSuffix: true,
    live: false,
  })}
></time>

<time
  data-test="live"
  {@attach countdown({ to: new Date(Date.now() + 2000) })}
></time>

<time
  data-test="on-complete"
  {@attach countdown({ to: new Date(Date.now() + 2000), oncomplete })}
></time>
