<script lang="typescript">
  import { onMount } from "svelte";
  import filter from "lodash/filter";
  import sumBy from "lodash/sumBy";
  import sortBy from "lodash/sortBy";
  import addDays from 'date-fns/addDays';
  import format from 'date-fns/format';
  import startOfMonth from 'date-fns/startOfMonth';
  import endOfMonth from 'date-fns/endOfMonth';
  import { user } from "../stores/userstore";
  import { issues } from "../stores/issuestore";
  import type IServerTimeEntry from "../interfaces/IServerTimeEntry";
  import type ITurno from "../interfaces/ITurno";
  import type IIssue from "../interfaces/IIssue";

  let quincena: ITurno[] = [];
  let serverEntries: IServerTimeEntry[];
  let totalHours: IIssue[] = $issues;
  $: serverEntries = [];

  onMount(async () => {
    const now = new Date();

    let from: Date;
    let to: Date;

    if (now.getDate() > 15) {
      from = new Date(now.getFullYear(), now.getMonth(), 16);
      to = endOfMonth(now);
    } else {
      from = startOfMonth(now);
      to = new Date(now.getFullYear(), now.getMonth(), 15);
    }

    while (from <= to) {
      const turno: ITurno = {
        fecha: format(from, "yyyy-MM-dd"),
        dia: from.getDay(),
        diaSemana: format(from, "dddd"),
      };
      from = addDays(from, 1);
      quincena.push(turno);
    }
    
    let tempServerEntries = await refreshTimeEntries();
    calculateTotalHoursPerIssue(tempServerEntries);
    serverEntries = tempServerEntries;
  });

  async function refreshTimeEntries(
    event?: Event
  ): Promise<IServerTimeEntry[]> {
    let result: IServerTimeEntry[] = [];
    if (event) {
      event.preventDefault();
    }
    if ($user.unauthorized === undefined && quincena.length) {
      const from = quincena[0].fecha;
      const to = quincena[quincena.length - 1].fecha;
      const res = await fetch(
        `/api/redmine/timeentries?userId=${$user.id}&from=${from}&to=${to}`, {
        headers: {
          "Redmine-Key": `${$user.api_key}`,
        }
      }
      );
      result = sortBy(await res.json(), ["spent_on", "id"]);
    }
    return result;
  }

  function calculateTotalHoursPerIssue(tempServerEntries:IServerTimeEntry[]) {
    let tempIssues = totalHours;
    for (let index = 0; index < tempIssues.length; index++) {
      const issueEntries = filter(
        tempServerEntries,
        (o: IServerTimeEntry) => o.issue.id === tempIssues[index].id
      );
      tempIssues[index].spent_hours = sumBy(issueEntries, "hours");
    }
    totalHours = tempIssues;
  }
</script>

<div class="container">
  <div class="row">
    <div class="col">
      {#each totalHours as issue (issue.id)}
        <h5>Total de horas para {issue.project.name} : {issue.spent_hours}</h5>
      {/each}
    </div>
  </div>
  <div class="row">
    <div class="col">
      <table class="table table-sm table-hover">
        <thead class="thead-dark">
          <tr>
            <th>Date</th>
            <th>Activity</th>
            <th>Comments</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {#each serverEntries as timeEntry}
            <tr>
              <td>{timeEntry.spent_on}</td>
              <td>{timeEntry.activity.name}</td>
              <td>{timeEntry.comments}</td>
              <td>{timeEntry.hours}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
