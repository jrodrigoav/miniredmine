<script>
  import { onMount } from "svelte";
  import Header from "./components/Header";
  import Index from "./pages/Index";
  import Login from "./pages/Login";
  import Profile from "./pages/Profile";
  import Issues from "./pages/Issues";
  import Templates from "./pages/Templates";
  import TimeEntries from "./pages/TimeEntries";
  import { user } from "./stores/userstore";

  function routeHandler(event, route) {
    event ? event.preventDefault() : () => {};
    window.history.replaceState(null, routeTranslator(route), route);
    currentRoute = route;
  }

  function routeTranslator(route) {
    let result;
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
