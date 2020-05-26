<script>
  export let applicationState = {};
</script>

<div class="jumbotron">
  <h1 class="display-3">MiniRedmine, Svelte!</h1>
  {#if applicationState.isRegistered}
    <p class="lead">Welcome {applicationState.user.firstname}.</p>
  {:else}
    <p class="lead">
      Welcome you need to register your user info to use the app.
    </p>
  {/if}
</div>
