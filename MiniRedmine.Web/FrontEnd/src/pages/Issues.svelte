<script lang="typescript">
  import { issues } from "../stores/issuestore";
  import { user } from "../stores/userstore";
  import IIssue from "../interfaces/IIssue";
  async function handleSubmit(event:Event) {
    event.preventDefault();
    let issueExists = false;
    let tempIssues = Array.from($issues);
    for (let index = 0; index < tempIssues.length; index++) {
      const element = tempIssues[index];
      if (element.id === newIssue) {
        issueExists = true;
      }
    }
    if (issueExists === false) {
      const res = await fetch(
        `api/redmine/issue/${newIssue}?userApiKey=${$user.api_key}`
      );
      tempIssues.push(await res.json());
      issues.updateIssues(tempIssues);
    }
  }

  function handleRemove(event:Event, id:number) {
    event.preventDefault();
    let deleteIndex:number = -1;
    let tempIssues:IIssue[] = Array.from($issues);
    for (let index = 0; index < tempIssues.length; index++) {
      const element = tempIssues[index];
      if (element.id === id) {
        deleteIndex = index;
      }
    }
    if (deleteIndex >= 0) {
      tempIssues.splice(deleteIndex, 1);
      issues.updateIssues(tempIssues);
    }
  }

  let newIssue: number = 0;
</script>

<div class="container">
  <div class="row">
    <div class="col-2">
      <form on:submit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="9999999"
          class="form-control"
          bind:value={newIssue} />
        <button type="submit" class="btn btn-sm btn-success">
          <i class="fas fa-plus-circle" />
        </button>
      </form>
    </div>
    <div class="col-8">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Issue</th>
            <th>Project</th>
            <th>Subject</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each $issues as issue (issue.id)}
            <tr>
              <td>{issue.id}</td>
              <td>{issue.project.name}</td>
              <td>{issue.subject}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  on:click={(e) => handleRemove(e, issue.id)}>
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
