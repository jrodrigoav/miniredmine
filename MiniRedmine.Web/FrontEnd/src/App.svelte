<script>
  import { onMount } from "svelte";
  import Header from "./components/Header";
  import Main from "./components/Main";

  import StorageService from "./services/StorageService";
  function routeHandler(event, route) {
    event ? event.preventDefault() : () => {};
    window.history.replaceState(null, routeTranslator(route), route);
    currentRoute = route;
    applicationState = StorageService.appState;
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
      default:
        result = "Index";
        break;
    }
    return result;
  }

  let currentRoute = "/";
  $: applicationState = {};

  onMount(async () => {
    await StorageService.init();
    applicationState = StorageService.appState;
  });
</script>

<Header handleNavigation={routeHandler} {applicationState} />
<Main handleNavigation={routeHandler} {currentRoute} {applicationState} />
