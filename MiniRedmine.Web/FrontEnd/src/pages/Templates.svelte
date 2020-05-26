<script>
  import axios from "axios";
  import StorageService from "../services/StorageService";

  export let applicationState = {};

  function handleSubmit(event) {
    event.preventDefault();
    newtemplate.id = templates.length;
    templates.push(newtemplate);
    StorageService.storeTemplates(templates);
    templates = templates;
    newtemplate = initTemplate();
  }

  function handleRemove(event, index) {
    event.preventDefault();
    templates.splice(index, 1);
    StorageService.storeTemplates(templates);
    templates = templates;
  }

  function initTemplate() {
    return {
      id: templates.length,
      issue: "",
      activity: "",
      comments: "",
      hours: 0,
    };
  }

  function translateActivity(activity) {
    let result = "";
    for (let index = 0; index < applicationState.activities.length; index++) {
      const element = applicationState.activities[index];
      if (element.id === activity) {
        result = element.name;
        break;
      }
    }
    return result;
  }

  function translateIssue(issue) {
    let result = "";
    for (let index = 0; index < applicationState.issues.length; index++) {
      const element = applicationState.issues[index];
      if (element.id === issue) {
        result = element.subject;
        break;
      }
    }
    return result;
  }

  let newtemplate = {};
  $: templates = applicationState.templates;
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
            {#each applicationState.issues as issue (issue.id)}
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
            {#each applicationState.activities as activity (activity.id)}
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
        <caption><p class="text-info">Total Hours: {templates.reduce((a,b) => a + Number.parseFloat(b.hours),0)}</p></caption>
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
          {#each templates as template (template.id)}
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
<!--
    [{"activityId":"50","issueId":"50283","hours":5,"comments":"Production Support"},{"activityId":"10","issueId":"50283","hours":0.5,"comments":"Daily Standup"},{"activityId":"9","issueId":"50283","hours":2.5,"comments":"Production Support Tools"}]
    [{"id":50283,"subject":"Project Activities - Jesus Acedo","project":{"id":409,"name":"Axos Bank - IT Operations - Production Support"},"assigned_to":{"id":627,"name":"Jesus Acedo"}},{"id":33651,"subject":".NET Interviews","project":{"id":46,"name":"Unosquare - Assessments "},"assigned_to":null}]
-->
