<script lang="ts">
  import { Countdown } from "svelte-time";

  const { oncomplete }: { oncomplete?: () => void } = $props();

  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
  const twoSecondsFromNow = new Date(now.getTime() + 2000);
  const inThePast = new Date(now.getTime() - 1000);

  let resetTarget = $state(inThePast);
  let resetOncompleteCalls = $state(0);

  function restart() {
    resetTarget = new Date(Date.now() + 2000);
  }
</script>

<!-- Basic: counts down to a future instant -->
<Countdown
  data-test="basic"
  to={fiveMinutesFromNow}
  live={false}
/>

<!-- Fixed format -->
<Countdown
  data-test="format-mm-ss"
  to={fiveMinutesFromNow}
  format="mm:ss"
  live={false}
/>

<!-- Humanize + withSuffix -->
<Countdown
  data-test="humanize-default"
  to={fiveMinutesFromNow}
  humanize
  live={false}
/>
<Countdown
  data-test="humanize-with-suffix"
  to={fiveMinutesFromNow}
  humanize
  withSuffix
  live={false}
/>

<!-- Locale -->
<Countdown
  data-test="locale-de"
  to={fiveMinutesFromNow}
  humanize
  locale="de"
  live={false}
/>

<!-- Live ticking (default: every second) -->
<Countdown
  data-test="live"
  to={twoSecondsFromNow}
/>

<!-- oncomplete fires once the countdown reaches zero -->
<Countdown
  data-test="on-complete"
  to={twoSecondsFromNow}
  {oncomplete}
/>

<!-- Already-past target completes immediately -->
<Countdown
  data-test="already-past"
  to={inThePast}
  live={false}
/>

<!-- children snippet receives the formatted value and the `done` flag -->
<Countdown
  data-test="children"
  to={twoSecondsFromNow}
>
  {#snippet children(formatted, done)}
    <span data-test="children-value">{formatted}</span>
    <span data-test="children-done">{done}</span>
  {/snippet}
</Countdown>

<!-- Changing `to` restarts the countdown and re-arms oncomplete -->
<Countdown
  data-test="reset"
  to={resetTarget}
  oncomplete={() => resetOncompleteCalls++}
/>
<span data-test="reset-oncomplete-calls">{resetOncompleteCalls}</span>
<button
  type="button"
  data-test="btn-restart"
  onclick={restart}
>
  Restart
</button>
