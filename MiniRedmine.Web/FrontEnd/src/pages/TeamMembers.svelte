<script lang="ts">
  import { teamMembers } from "../stores/teammemberstore";
  let newTeamMember: number = 0;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    let memberExists = false;
    let tempMembers = Array.from($teamMembers);
    let index =tempMembers.indexOf(newTeamMember);
    if(index >=0)
    {
      newTeamMember = 0;
    }
    else
    {
      tempMembers.push(newTeamMember);
      newTeamMember = 0;
      teamMembers.updateMembers(tempMembers);
    }
  }

  function handleRemove(event: Event, index: number) {
    event.preventDefault();
    let tempMembers = Array.from($teamMembers);
    tempMembers.splice(index,1);
    teamMembers.updateMembers(tempMembers);
  }
</script>

<div class="container">
  <div class="row">
    <div class="col-4">
      <form on:submit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="9999999"
          step="1"
          class="form-control"
          bind:value={newTeamMember} />
        <button type="submit" class="btn btn-sm btn-success">
          <i class="fas fa-plus-circle" />
        </button>
      </form>
    </div>
    <div class="col">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Member Id</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each $teamMembers as member,i }
            <tr>
              <td>{member}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  on:click={(e) => handleRemove(e, i)}>
                  <i class="fas fa-trash" />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

