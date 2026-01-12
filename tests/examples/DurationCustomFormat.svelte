<script>
  import { Duration } from "svelte-time";
</script>

<div>
  <!-- Hours:Minutes:Seconds format -->
  <Duration value={3661000} format="HH:mm:ss" />
</div>

<div>
  <!-- Minutes:Seconds format (total minutes) -->
  <Duration value={90000} format="mm:ss" />
</div>

<div>
  <!-- Hours:Minutes format -->
  <Duration value={5400000} format="HH:mm" />
</div>

<div>
  <!-- Unpadded hours and minutes -->
  <Duration value={3661000} format="H:m:s" />
</div>

<div>
  <!-- Minutes and seconds with milliseconds -->
  <Duration value={125000} format="mm:ss.SSS" />
</div>

<div>
  <!-- Long duration with hours, minutes, seconds -->
  <Duration value={7323000} format="HH:mm:ss" />
</div>
