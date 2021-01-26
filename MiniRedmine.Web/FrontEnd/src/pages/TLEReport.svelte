<script lang="typescript">
  import { onMount } from "svelte";
  import addDays from "date-fns/addDays";
  import format from "date-fns/format";
  import startOfMonth from "date-fns/startOfMonth";
  import endOfMonth from "date-fns/endOfMonth";
  let from: Date;
  let to: Date;
  $: from = new Date();
  $: to = new Date();
  onMount(async () => {
    const now = new Date();

    if (now.getDate() > 15) {
      from = new Date(now.getFullYear(), now.getMonth(), 16);
      to = endOfMonth(now);
    } else {
      from = startOfMonth(now);
      to = new Date(now.getFullYear(), now.getMonth(), 15);
    }
  });
</script>

<div class="container">
  <div class="row">
    <div class="col">
      <h2>
        Time entries report for period
        <small class="text-dark bg-info">{format(from, 'EEEE, yyyy-MM-dd')}</small>
        to
        <small class="text-dark bg-info">{format(to, 'EEEE, yyyy-MM-dd')}</small>
      </h2>
    </div>
  </div>
</div>
