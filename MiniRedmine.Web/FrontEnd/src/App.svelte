<script lang="ts">
  import { onMount } from "svelte";
  import Header from "./components/Header.svelte";
  import Index from "./pages/Index.svelte";
  import Login from "./pages/Login.svelte";
  import Profile from "./pages/Profile.svelte";
  import Issues from "./pages/Issues.svelte";
  import Templates from "./pages/Templates.svelte";
  import TimeEntries from "./pages/TimeEntries.svelte";
  import Report from "./pages/Report.svelte";
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
      case "/user/profile":
        result = "Profile";
        break;
      case "/user/issues":
        result = "Issues";
        break;
      case "/user/templates":
        result = "Templates";
        break;
      case "/user/timeentries":
        result = "Time Entries";
        break;
      case "/user/report":
        result = "Time Card";
        break;
      default:
        result = "Index";
        break;
    }
    return result;
  }
  let leadIds: Array<Number>;
  let currentRoute: string;
  let isLead: boolean;
  $: currentRoute = "/";

  onMount(async () => {
    routeHandler(null, window.location.pathname);
  });
</script>

<Header handleNavigation={routeHandler} />
{#if currentRoute === "/"}
  <Index />
{:else if currentRoute === "/login" && $user.unauthorized === true}
  <Login handleNavigation={routeHandler} />
{:else if currentRoute === "/user/profile" && $user.unauthorized === undefined}
  <Profile />
{:else if currentRoute === "/user/issues" && $user.unauthorized === undefined}
  <Issues />
{:else if currentRoute === "/user/templates" && $user.unauthorized === undefined}
  <Templates />
{:else if currentRoute === "/user/timeentries" && $user.unauthorized === undefined}
  <TimeEntries />
{:else if currentRoute === "/user/report" && $user.unauthorized === undefined}
  <Report />
{:else}
  <Index />
{/if}
<footer>
  Copyright &copy; Jesus Acedo 2018 - 2023 version: 2.6.1
</footer>