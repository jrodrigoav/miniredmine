<script lang="typescript">
  import { onMount } from "svelte";
  import filter from "lodash/filter";
  import sumBy from "lodash/sumBy";
  import sortBy from "lodash/sortBy";
  import moment from "moment";
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
    const now = moment();

    let from = null;
    let to = null;

    if (now.date() > 15) {
      from = moment().year(now.year()).month(now.month()).date(16);
      to = now.endOf("month");
    } else {
      from = now.startOf("month");
      to = moment().year(now.year()).month(now.month()).date(15);
    }

    while (from.isSameOrBefore(to)) {
      const turno: ITurno = {
        fecha: from.format("YYYY-MM-DD"),
        dia: from.day(),
        diaSemana: from.format("dddd"),
      };
      from.add(1, "days");
      quincena.push(turno);
    }
    //console.log(quincena);
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
        `api/redmine/timeentries?userApiKey=${$user.api_key}&userId=${$user.id}&from=${from}&to=${to}`
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
