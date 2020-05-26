<script>
  import { onMount } from "svelte";
  import Header from "./components/Header";
  import Main from "./components/Main";
  
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
      default:
        result = "Index";
        break;
    }
    return result;
  }

  let currentRoute = "/"; 

  onMount(()=>{
    routeHandler(null,window.location.pathname);
  });
</script>

<Header handleNavigation={routeHandler} />
<Main handleNavigation={routeHandler} {currentRoute}/>
