<script lang="ts">
  import { user } from "../stores/userstore";
</script>

<div class="jumbotron">
  <h1 class="display-3">🐊 MiniRedmine, Svelte! 🦄</h1>
  {#if $user.unauthorized === true}
    <p class="lead">
      Welcome you need to register your user info to use the app.
    </p>
  {:else}
    <p class="lead">Welcome {$user.firstname}.</p>
  {/if}
</div>
