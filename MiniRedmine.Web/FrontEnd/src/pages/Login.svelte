<script>
  import axios from "axios";
  import StorageService from "../services/StorageService";

  export let handleNavigation;

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch(`api/redmine/userinfo?userApiKey=${userApiKey}`);
    StorageService.storeUser(await res.json())
    handleNavigation(null, "/");
  }
  let userApiKey = null;
</script>

<div class="container">
  <div class="row">
    <div class="col">
      <form on:submit={handleSubmit}>
        <h1 class="h3 mb-3 font-weight-normal">
          Please input your Redmine Api Key
        </h1>
        <label for="inputApiKey" class="sr-only">Api Key</label>
        <input
          type="text"
          id="inputApiKey"
          class="form-control"
          placeholder="Redmine Api Key"
          required=""
          bind:value={userApiKey} />
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
</div>
