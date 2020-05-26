<script>
  export let handleNavigation;
  export let applicationState = {};
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
  <a class="navbar-brand" href="/" on:click={(e) => handleNavigation(e, '/')}>
    Mini Redmine 2
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#mainnavbar"
    aria-controls="mainnavbar"
    aria-expanded="false"
    aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>
  <div class="collapse navbar-collapse" id="mainnavbar">
    <ul class="navbar-nav mr-auto">
      {#if applicationState.isRegistered === false}
        <li class="nav-item">
          <a
            class="nav-link"
            href="/login"
            on:click={(e) => handleNavigation(e, '/login')}>
            Login
          </a>
        </li>
      {:else}
        <li class="nav-item">
          <a
            class="nav-link"
            href="/profile"
            on:click={(e) => handleNavigation(e, '/profile')}>
            Profile
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/issues"
            on:click={(e) => handleNavigation(e, '/issues')}>
            Issues
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/templates"
            on:click={(e) => handleNavigation(e, '/templates')}>
            Templates
          </a>
        </li>
      {/if}
    </ul>
  </div>
</nav>
