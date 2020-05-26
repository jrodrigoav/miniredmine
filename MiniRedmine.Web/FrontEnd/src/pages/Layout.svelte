<script>
  import { Route } from 'svelte-router-spa'
  import Header from './Header.svelte'
  export let currentRoute
  const params = {}
</script>

<Header />
<Route {currentRoute}  {params} />

