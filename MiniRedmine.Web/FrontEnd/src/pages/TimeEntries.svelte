<script lang="typescript">
  import { onMount } from "svelte";
  import indexOf from "lodash/indexOf";
  import filter from "lodash/filter";
  import sumBy from "lodash/sumBy";
  import sortBy from "lodash/sortBy";
  import moment from "moment";
  import { user } from "../stores/userstore";
  import { issues } from "../stores/issuestore";
  import { templates } from "../stores/templatestore";
  import { activities } from "../stores/activitystore";
  import INewTimeEntry from "../interfaces/INewTimeEntry";
  import ITimeEntry from "../interfaces/ITimeEntry";
  import ITurno from "../interfaces/ITurno";
  import IModalData from "../interfaces/IModalData";
  import IIssue from "../interfaces/IIssue";
  import ITemplate from "../interfaces/ITemplate";

  const holidays = [
    "2020-05-25",
    "2020-07-04",
    "2020-09-07",
    "2020-09-16",
    "2020-10-12",
    "2020-11-11",
    "2020-11-26",
    "2020-12-25",
  ];
  let quincena: ITurno[] = new Array<ITurno>();
  let serverEntries: ITimeEntry[] = new Array<ITimeEntry>();
  let displayWeekends = false;
  let timeEntries: INewTimeEntry[];
  let modalWarning: boolean;
  $: modalWarning = false;
  $: timeEntries = new Array<INewTimeEntry>();
  let modalData: IModalData;
  $: modalData = { turno: {} as ITurno, entries: new Array<INewTimeEntry>() };

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
    await refreshTimeEntries();
  });

  async function refreshTimeEntries(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    if ($user.unauthorized === undefined && quincena.length) {
      const from = quincena[0].fecha;
      const to = quincena[quincena.length - 1].fecha;
      const res = await fetch(
        `api/redmine/timeentries?userApiKey=${$user.api_key}&userId=${$user.id}&from=${from}&to=${to}`
      );
      serverEntries = sortBy(await res.json(), ["spent_on", "id"]);
      refreshTable();
    }
  }

  function refreshTable() {
    let tempEntries: INewTimeEntry[] = [];
    quincena.forEach((element) => {
      const entries: ITimeEntry[] = filter(serverEntries, {
        spent_on: element.fecha,
      });
      if (displayWeekends === true && entries.length === 0) {
        tempEntries.push(addEmptyDay(element));
      } else if (
        entries.length === 0 &&
        displayWeekends === false &&
        element.dia !== 0 &&
        element.dia !== 6
      ) {
        tempEntries.push(addEmptyDay(element));
      } else if (entries.length) {
        const hours = entries.reduce((a, b) => a + b.hours, 0);
        entries.forEach((entry) => {
          let newentry = {
            id: "" + entry.id,
            spent_on: entry.spent_on,
            issue: entry.issue,
            activity: entry.activity,
            comments: entry.comments,
            hours: entry.hours,
            turno: element,
            empty: false,
            totalhours: hours,
          };
          tempEntries.push(newentry);
        });
      }
    });

    timeEntries = tempEntries;
  }

  function handleModalOpen(event: Event, timeEntry: INewTimeEntry) {
    event.preventDefault();
    modalData.turno = timeEntry.turno;
    const index: number = indexOf(holidays, modalData.turno.fecha);
    modalWarning =
      modalData.turno.dia === 0 || modalData.turno.dia === 6 || index >= 0;
    if (timeEntry.empty && $templates.length === 0) {
      modalData.entries.push(addEntry(timeEntry.turno.fecha));
    } else if ($templates.length > 0 && timeEntry.empty) {
      modalData.entries = [];
      $templates.forEach((template: ITemplate) => {
        modalData.entries.push({
          id: template.id,
          spent_on: timeEntry.turno.fecha,
          issue: { id: template.issue, name: "" },
          activity: { id: template.activity, name: "" },
          comments: template.comments,
          hours: template.hours,
          empty: false,
        });
      });
    } else {
      modalData.entries.push(addEntry(timeEntry.turno.fecha));
    }
  }

  function handleAddEmptyEntryInModal(event: Event, fecha: string) {
    event.preventDefault();
    let tempEntries = Array.from(modalData.entries);
    tempEntries.push(addEntry(fecha));
    modalData.entries = tempEntries;
  }

  function addEntry(fecha: string): INewTimeEntry {
    const now = new Date();
    return {
      id: `${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`,
      spent_on: fecha,
      issue: { id: -1, name: "No Hours registered" },
      activity: { id: -1, name: "No Hours registered" },
      comments: "",
      hours: 0,
      empty: false,
    };
  }

  function addEmptyDay(turno: ITurno): INewTimeEntry {
    const now = new Date();
    return {
      id: `${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`,
      spent_on: turno.fecha,
      issue: { id: -1, name: "No Hours registered" },
      activity: { id: -1, name: "No Hours registered" },
      comments: "No Hours registered",
      hours: 0,
      turno: turno,
      totalhours: 0,
      empty: true,
    };
  }

  async function handleModalSave() {
    let tempServerEntries = Array.from(serverEntries);
    await asyncForEach(modalData.entries, async (element: INewTimeEntry) => {
      const res = await fetch(
        `api/redmine/timeentries?userApiKey=${$user.api_key}`,
        {
          method: "POST",
          body: JSON.stringify(element),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok === true) {
        tempServerEntries.push(await res.json());
      }
    });
    serverEntries = sortBy(tempServerEntries, ["spent_on", "id"]);
    modalData = { turno: {} as ITurno, entries: new Array<INewTimeEntry>() };
    refreshTable();
  }

  function handleModalClose() {
    modalData = { turno: {} as ITurno, entries: new Array<INewTimeEntry>() };
  }

  async function asyncForEach(array: Array<any>, callback: Function) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  function removeModalEntry(event: Event, index: number) {
    event.preventDefault();
    let tempEntries = Array.from(modalData.entries);
    if (tempEntries.length > 1) {
      tempEntries.splice(index, 1);
      modalData.entries = tempEntries;
    }
  }

  function calculateTotalHoursPerIssue(issue: IIssue) {
    return sumBy(
      filter(timeEntries, (o: INewTimeEntry) => o.issue.id == issue.id),
      "hours"
    );
  }
</script>

<style>
  td {
    color: black;
    text-shadow: 1px 1px lightgrey;
  }
  tr.monday {
    background-color: lightgoldenrodyellow;
  }
  tr.tuesday {
    background-color: lightpink;
  }
  tr.wednesday {
    background-color: lightseagreen;
  }
  tr.thursday {
    background-color: lightsalmon;
  }
  tr.friday {
    background-color: lightsteelblue;
  }
  tr.saturday {
    background-color: wheat;
  }
  tr.sunday {
    background-color: coral;
  }
</style>

<div class="container">
  <div class="row">
    <div class="col">
      {#each $issues as issue}
        <h5>
          Total de horas para {issue.project.name} : {calculateTotalHoursPerIssue(issue)}
        </h5>
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
            <th>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="displayWeekends"
                  bind:checked={displayWeekends}
                  on:change={refreshTable} />
                <label class="form-check-label" for="displayWeekends">
                  Display Weekends
                </label>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each timeEntries as timeEntry}
            <tr class={timeEntry.turno.diaSemana.toLowerCase()}>
              <td>{timeEntry.spent_on} {timeEntry.turno.diaSemana}</td>
              <td>{timeEntry.activity.name}</td>
              <td>{timeEntry.comments}</td>
              <td>{timeEntry.hours}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm {timeEntry.totalhours > 0 ? 'btn-primary' : 'btn-success'}"
                  data-toggle="modal"
                  data-target="#timeEntriesForm"
                  on:click={(e) => handleModalOpen(e, timeEntry)}>
                  <i class="fas fa-calendar-plus" />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="timeEntriesForm"
    tabindex={-1}
    role="dialog"
    aria-labelledby="timeEntriesFormTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header {modalWarning ? 'bg-warning' : ''}">
          <h5 class="modal-title" id="timeEntriesFormTitle">
            Register Time Entries for {modalData.turno.diaSemana} {modalData.turno.fecha}
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            on:click={handleModalClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <table>
            <caption>
              <button
                type="button"
                class="btn btn-sm btn-info"
                on:click={(e) => handleAddEmptyEntryInModal(e, modalData.turno.fecha)}>
                <i class="fas fa-calendar-plus" />
                Add empty entry
              </button>
            </caption>
            <thead>
              <tr>
                <th>Issue</th>
                <th>Activity</th>
                <th>Comments</th>
                <th>Hours</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {#each modalData.entries as entry, index (entry.id)}
                <tr>
                  <td>
                    <select
                      bind:value={entry.issue}
                      class="form-control"
                      name="Issue">
                      <option value="" selected>--Select an issue--</option>
                      {#each $issues as issue (issue.id)}
                        <option value={issue.id}>
                          {issue.id} {issue.project.name}
                        </option>
                      {/each}
                    </select>
                  </td>
                  <td>
                    <select
                      bind:value={entry.activity}
                      class="form-control"
                      name="Activity">
                      <option value="" selected>--Select an activity--</option>
                      {#each $activities as activity (activity.id)}
                        <option value={activity.id}>{activity.name}</option>
                      {/each}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      bind:value={entry.comments}
                      class="form-control"
                      placeholder="Comments" />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0.0"
                      max="24.0"
                      step="0.5"
                      bind:value={entry.hours}
                      class="form-control"
                      placeholder="Hours" />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      on:click={(e) => removeModalEntry(e, index)}>
                      <i class="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            on:click={handleModalClose}>
            Close
          </button>
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"
            on:click={async () => await handleModalSave()}>
            Submit Time Entries
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
