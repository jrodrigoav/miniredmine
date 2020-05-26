<script>
  import Index from "../pages/Index";
  import Login from "../pages/Login";
  import Profile from "../pages/Profile";
  import Issues from "../pages/Issues";
  import Templates from "../pages/Templates.svelte";
  import { user } from "../stores/userstore";
  export let handleNavigation;
  export let currentRoute;
</script>

{#if currentRoute === '/'}
  <Index />
{:else if currentRoute === '/login' && $user.unauthorized === true}
  <Login {handleNavigation} />
{:else if currentRoute === '/profile' && $user.unauthorized === undefined}
  <Profile />
{:else if currentRoute === '/issues' && $user.unauthorized === undefined}
  <Issues />
{:else if currentRoute === '/templates' && $user.unauthorized === undefined}
  <Templates />
{:else}
  <Index />
{/if}
