<script>
  import Index from "../pages/Index";
  import Login from "../pages/Login";
  import Profile from "../pages/Profile";
  import Issues from "../pages/Issues";
  import Templates from "../pages/Templates.svelte";
  export let handleNavigation;
  export let currentRoute;
  export let applicationState = {};
</script>

{#if currentRoute === '/'}
  <Index {applicationState} />
{:else if currentRoute === '/login' && applicationState.isRegistered === false}
  <Login {handleNavigation} />
{:else if currentRoute === '/profile' && applicationState.isRegistered === true}
  <Profile user={applicationState.user} />
{:else if currentRoute === '/issues' && applicationState.isRegistered === true}
  <Issues {applicationState} />
{:else if currentRoute === '/templates' && applicationState.isRegistered === true}
  <Templates {applicationState} />
{:else}
  <Index {applicationState} />
{/if}
