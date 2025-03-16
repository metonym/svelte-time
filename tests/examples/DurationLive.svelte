<script>
  import { Duration } from "svelte-time";

  // Countdown timer: 5 minutes (300000 milliseconds)
  // For a countdown, the value must decrease over time
  let countdown = $state(5 * 60 * 1000);

  $effect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        countdown -= 1000; // Decrease by 1 second each interval
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div>
  <!-- Countdown timer: value decreases, live prop updates display every second -->
  <Duration value={countdown} live={1000} format="mm:ss" />
</div>
