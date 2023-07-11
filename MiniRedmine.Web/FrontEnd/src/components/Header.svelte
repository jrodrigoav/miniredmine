<script lang="ts">
  import { user } from "../stores/userstore";
  export let handleNavigation: Function;
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
  <a class="navbar-brand" href="/" on:click={(e) => handleNavigation(e, "/")}>
    Mini Redmine 2
  </a>
  <button class="navbar-toggler"  type="button" data-bs-toggle="collapse" data-bs-target="#mainnavbar" aria-controls="mainnavbar" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
  </button>
  <div class="collapse navbar-collapse" id="mainnavbar">
    <ul class="navbar-nav mr-auto">
      {#if $user.unauthorized === true}
        <li class="nav-item">
          <a
            class="nav-link"
            href="/login"
            on:click={(e) => handleNavigation(e, "/login")}
          >
            Login
          </a>
        </li>
      {:else}
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="navbarUser"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            User Menu
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarUser">
            <li>
              <a
                class="dropdown-item"
                href="/user/profile"
                on:click={(e) => handleNavigation(e, "/user/profile")}
                >Profile</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="/user/issues"
                on:click={(e) => handleNavigation(e, "/user/issues")}>Issues</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                href="/user/templates"
                on:click={(e) => handleNavigation(e, "/user/templates")}
                >Templates</a
              >
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/user/timeentries"
            on:click={(e) => handleNavigation(e, "/user/timeentries")}
          >
            Time Entries
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="/user/report"
            on:click={(e) => handleNavigation(e, "/user/report")}
          >
            Report
          </a>
        </li>
      {/if}
    </ul>
  </div>
</nav>
