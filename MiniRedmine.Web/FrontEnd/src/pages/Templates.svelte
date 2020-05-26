<script>
  import { onMount } from "svelte";
  import { user } from "../stores/userstore";
  import { issues } from "../stores/issuestore";
  import { templates } from "../stores/templatestore";
  import { activities } from "../stores/activitystore";

  function handleSubmit(event) {
    event.preventDefault();
    let tempTemplates = Array.from($templates);
    tempTemplates.push(newtemplate);
    templates.updateTemplates(tempTemplates);
    newtemplate = initTemplate();
  }

  function handleRemove(event, id) {
    event.preventDefault();
    let deleteIndex = -1;
    let tempTemplates = Array.from($templates);
    for (let index = 0; index < tempTemplates.length; index++) {
      const element = tempTemplates[index];
      if (element.id === id) {
        deleteIndex = index;
      }
    }
    if (deleteIndex >= 0) {
      tempTemplates.splice(deleteIndex, 1);
      templates.updateTemplates(tempTemplates);
    }
  }

  function initTemplate() {
    const now = new Date();
    return {
      id: `${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`,
      issue: "",
      activity: "",
      comments: "",
      hours: 0,
    };
  }

  function translateActivity(activity) {
    let result = "";
    for (let index = 0; index < $activities.length; index++) {
      const element = $activities[index];
      if (element.id === activity) {
        result = element.name;
        break;
      }
    }
    return result;
  }

  function translateIssue(issue) {
    let result = "";
    for (let index = 0; index < $issues.length; index++) {
      const element = $issues[index];
      if (element.id === issue) {
        result = element.subject;
        break;
      }
    }
    return result;
  }

  let newtemplate = initTemplate();

  onMount(async () => {
    if ($user.unauthorized === undefined && $activities.length === 0) {
      const res = await fetch(
        `api/redmine/timeentryactivities?userApiKey=${$user.api_key}`
      );
      const tempActivities = await res.json();
      activities.updateActivities(tempActivities);
    }
  });
</script>

<div class="container">
  <div class="row">
    <div class="col">
      <form on:submit={handleSubmit}>
        <div class="form-group">
          <label for="Issue">Issue</label>
          <select
            bind:value={newtemplate.issue}
            class="form-control"
            name="Issue">
            <option value="" selected>--Select an issue--</option>
            {#each $issues as issue (issue.id)}
              <option value={issue.id}>{issue.subject}</option>
            {/each}
          </select>
        </div>
        <div class="form-group">
          <label for="Issue">Activity</label>
          <select
            bind:value={newtemplate.activity}
            class="form-control"
            name="Activity">
            <option value="" selected>--Select an activity--</option>
            {#each $activities as activity (activity.id)}
              <option value={activity.id}>{activity.name}</option>
            {/each}
          </select>
        </div>
        <div class="form-group">
          <label for="Comments">Comments</label>
          <input
            type="text"
            bind:value={newtemplate.comments}
            class="form-control"
            placeholder="Comments" />
        </div>
        <div class="form-group">
          <label for="Hours">Hours</label>
          <input
            type="number"
            min="0.0"
            max="24.0"
            step="0.5"
            bind:value={newtemplate.hours}
            class="form-control"
            placeholder="Hours" />
        </div>
        <button type="submit" class="btn btn-sm btn-success">
          <i class="fas fa-plus-circle" />
        </button>
      </form>
    </div>
    <div class="col">
      <table class="table table-striped">
        <caption>
          <p class="text-info">
            Total Hours: {$templates.reduce((a, b) => a + Number.parseFloat(b.hours), 0)}
          </p>
        </caption>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Activty</th>
            <th>Comments</th>
            <th>Hours</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {#each $templates as template (template.id)}
            <tr>
              <td>{translateIssue(template.issue)}</td>
              <td>{translateActivity(template.activity)}</td>
              <td>{template.comments}</td>
              <td>{template.hours}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm btn-danger"
                  on:click={(e) => handleRemove(e, template.id)}>
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
