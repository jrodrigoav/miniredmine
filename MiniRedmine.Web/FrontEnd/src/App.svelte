<script lang="typescript">
  import { onMount } from "svelte";
  import Header from "./components/Header.svelte";
  import Index from "./pages/Index.svelte";
  import Login from "./pages/Login.svelte";
  import Profile from "./pages/Profile.svelte";
  import Issues from "./pages/Issues.svelte";
  import Templates from "./pages/Templates.svelte";
  import TimeEntries from "./pages/TimeEntries.svelte";
  import { user } from "./stores/userstore";

  function routeHandler(event: Event, route: string) {
    event ? event.preventDefault() : () => {};
    window.history.replaceState(null, routeTranslator(route), route);
    currentRoute = route;
  }

  function routeTranslator(route: string): string {
    let result: string;
    switch (route) {
      case "/login":
        result = "Login";
        break;
      case "/profile":
        result = "Profile";
        break;
      case "/issues":
        result = "Issues";
        break;
      case "/templates":
        result = "Templates";
        break;
      case "/timeentries":
        result = "Time Entries";
        break;
      default:
        result = "Index";
        break;
    }
    return result;
  }
  let currentRoute: string;
  $: currentRoute = "/";

  onMount(() => {
    routeHandler(null, window.location.pathname);
  });
</script>

<Header handleNavigation={routeHandler} />
{#if currentRoute === '/'}
  <Index />
{:else if currentRoute === '/login' && $user.unauthorized === true}
  <Login handleNavigation={routeHandler} />
{:else if currentRoute === '/profile' && $user.unauthorized === undefined}
  <Profile />
{:else if currentRoute === '/issues' && $user.unauthorized === undefined}
  <Issues />
{:else if currentRoute === '/templates' && $user.unauthorized === undefined}
  <Templates />
{:else if currentRoute === '/timeentries' && $user.unauthorized === undefined}
  <TimeEntries />
{:else}
  <Index />
{/if}
