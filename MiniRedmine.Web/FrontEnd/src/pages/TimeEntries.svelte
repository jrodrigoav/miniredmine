<script lang="typescript">
  import { onMount } from "svelte";
  import indexOf from "lodash/indexOf";
  import filter from "lodash/filter";
  import sortBy from "lodash/sortBy";
  import addDays from 'date-fns/addDays';
  import format from 'date-fns/format';
  import startOfMonth from 'date-fns/startOfMonth';
  import endOfMonth from 'date-fns/endOfMonth';
  import { user } from "../stores/userstore";
  import { issues } from "../stores/issuestore";
  import { templates } from "../stores/templatestore";
  import { activities } from "../stores/activitystore";
  import type INewTimeEntry from "../interfaces/INewTimeEntry";
  import type ITimeEntry from "../interfaces/ITimeEntry";
  import type ITurno from "../interfaces/ITurno";
  import type IModalData from "../interfaces/IModalData";
  import type ITemplate from "../interfaces/ITemplate";
  import type IServerTimeEntry from "../interfaces/IServerTimeEntry";

  const holidays = [
    "2021-01-01",
    "2021-01-18",
    "2021-02-15",
    "2021-05-31",
    "2021-07-04",
    "2021-09-06",
    "2021-09-16",
    "2021-10-11",
    "2021-11-11",
    "2021-11-25",
    "2021-12-25",
    "2022-01-01"
  ];
  let quincena: ITurno[] = [];
  let serverEntries: IServerTimeEntry[];
  let displayEntries: ITimeEntry[];
  let displayWeekends = false;
  let modalWarning: boolean;
  $: modalWarning = false;
  $: displayEntries = [];
  let modalData: IModalData;
  $: modalData = { turno: {} as ITurno, entries: [] };

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
        diaSemana: format(from, "EEE"),
      };
      from = addDays(from, 1);
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
        `/api/redmine/timeentries?userApiKey=${$user.api_key}&userId=${$user.id}&from=${from}&to=${to}`
      );
      serverEntries = sortBy(await res.json(), ["spent_on", "id"]);
      refreshTable();
    }
  }

  function refreshTable() {
    let tempEntries: ITimeEntry[] = [];
    quincena.forEach((diaQuincena) => {
      const entries: IServerTimeEntry[] = filter(serverEntries, {
        spent_on: diaQuincena.fecha,
      });
      if (displayWeekends === true && entries.length === 0) {
        tempEntries.push(addEmptyDay(diaQuincena));
      } else if (
        entries.length === 0 &&
        displayWeekends === false &&
        diaQuincena.dia !== 0 &&
        diaQuincena.dia !== 6
      ) {
        tempEntries.push(addEmptyDay(diaQuincena));
      } else if (entries.length) {
        entries.forEach((entry) => {
          let newentry: ITimeEntry = {
            id: entry.id,
            spent_on: entry.spent_on,
            issueId: entry.issue.id,
            issue: entry.issue.name,
            activity: entry.activity.name,
            comments: entry.comments,
            hours: entry.hours,
            jornada: diaQuincena,
          };
          tempEntries.push(newentry);
        });
      }
    });

    displayEntries = tempEntries;
  }

  function handleModalOpen(event: Event, timeEntry: ITimeEntry) {
    event.preventDefault();
    modalData.turno = timeEntry.jornada;
    const index: number = indexOf(holidays, modalData.turno.fecha);
    modalWarning =
      modalData.turno.dia === 0 || modalData.turno.dia === 6 || index >= 0;
    if (timeEntry.id > 0 && $templates.length === 0) {
      modalData.entries.push(addEmptyNewEntry(timeEntry.jornada));
    } else if ($templates.length > 0 && timeEntry.id < 0) {
      modalData.entries = [];
      $templates.forEach((template: ITemplate) => {
        modalData.entries.push({
          spent_on: timeEntry.jornada.fecha,
          issue: template.issue,
          activity: template.activity,
          comments: template.comments,
          hours: template.hours,
        });
      });
    } else {
      modalData.entries.push(addEmptyNewEntry(timeEntry.jornada));
    }
  }

  function handleAddEmptyEntryInModal(event: Event) {
    event.preventDefault();
    let tempEntries = Array.from(modalData.entries);
    tempEntries.push(addEmptyNewEntry(modalData.turno));
    modalData.entries = tempEntries;
  }

  function addEmptyNewEntry(turno: ITurno): INewTimeEntry {
    return {
      spent_on: turno.fecha,
      issue: 0,
      activity: 0,
      comments: "",
      hours: 0,
    };
  }

  function addEmptyDay(turno: ITurno): ITimeEntry {
    return {
      id: -1,
      spent_on: turno.fecha,
      issueId: 0,
      issue: "No Hours registered",
      activity: "No Hours registered",
      comments: "No Hours registered",
      hours: 0,
      jornada: turno,
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
    modalData = { turno: {} as ITurno, entries: [] };
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
          {#each displayEntries as timeEntry}
            <tr class={timeEntry.jornada.diaSemana.toLowerCase()}>
              <td>{timeEntry.spent_on} {timeEntry.jornada.diaSemana}</td>
              <td>{timeEntry.activity}</td>
              <td>{timeEntry.comments}</td>
              <td>{timeEntry.hours}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-sm {timeEntry.id < 0 ? 'btn-success' : 'btn-primary'}"
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
            Register Time Entries for {modalData.turno.diaSemana}
            {modalData.turno.fecha}
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
                on:click={(e) => handleAddEmptyEntryInModal(e)}>
                <i class="fas fa-calendar-plus" /> Add empty entry
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
              {#each modalData.entries as entry, index}
                <tr>
                  <td>
                    <select
                      bind:value={entry.issue}
                      class="form-control"
                      name="Issue">
                      <option value="" selected>--Select an issue--</option>
                      {#each $issues as issue (issue.id)}
                        <option value={issue.id}>
                          {issue.id}
                          {issue.project.name}
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
