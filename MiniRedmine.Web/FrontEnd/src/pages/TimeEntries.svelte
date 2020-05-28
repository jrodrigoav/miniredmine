<script>
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
  let quincena = [];
  let serverEntries = [];
  let displayWeekends = false;
  $: modalWarning = false;
  $: timeEntries = [];
  $: modalData = { turno: {}, entries: [] };

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
      const turno = {
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

  async function refreshTimeEntries(event = Event) {
    event && typeof event.preventDefault === "function"
      ? event.preventDefault()
      : () => {};
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
    let tempEntries = [];
    quincena.forEach((element, index) => {
      const entries = filter(serverEntries, { spent_on: element.fecha });
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
        const hours = entries.reduce(
          (a, b) => a + Number.parseFloat(b.hours),
          0
        );
        entries.forEach((entry) => {
          let newentry = entry;
          newentry.turno = element;
          newentry.empty = false;
          newentry.totalhours = hours;
          tempEntries.push(newentry);
        });
      }
    });

    timeEntries = tempEntries;
  }

  function handleModalOpen(event, timeEntry) {
    modalData.turno = timeEntry.turno;
    const index = indexOf(holidays, modalData.turno.fecha);
    console.log(`index ${index}`);
    modalWarning =
      modalData.turno.dia === 0 || modalData.turno.dia === 6 || index >= 0;
    if (timeEntry.empty && $templates.length === 0) {
      modalData.entries.push(addEntry(timeEntry.turno.fecha));
    } else if ($templates.length > 0 && timeEntry.empty) {
      modalData.entries = [];
      $templates.forEach((template) => {
        modalData.entries.push({
          id: template.id,
          spent_on: timeEntry.turno.fecha,
          issue: template.issue,
          activity: template.activity,
          comments: template.comments,
          hours: template.hours,
        });
      });
    } else {
      modalData.entries.push(addEntry(timeEntry.turno.fecha));
    }
  }

  function handleAddEmptyEntryInModal(event, fecha) {
    event.preventDefault();
    let tempEntries = Array.from(modalData.entries);
    tempEntries.push(addEntry(fecha));
    modalData.entries = tempEntries;
  }

  function addEntry(fecha) {
    const now = new Date();
    return {
      id: `${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`,
      spent_on: fecha,
      issue: "",
      activity: "",
      comments: "",
      hours: 0,
    };
  }

  function addEmptyDay(turno) {
    const now = new Date();
    return {
      id: `${now.getFullYear()}${now.getMonth()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`,
      spent_on: turno.fecha,
      issue: { name: "No Hours registered" },
      activity: { name: "No Hours registered" },
      comments: "No Hours registered",
      hours: 0,
      turno: turno,
      totalhours: 0,
      empty: true,
    };
  }

  async function handleModalSave() {
    let tempServerEntries = Array.from(serverEntries);
    await asyncForEach(modalData.entries, async (element) => {
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
    modalData = { turno: {}, entries: [] };
    refreshTable();
  }

  function handleModalClose() {
    modalData = { turno: {}, entries: [] };
  }

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  function removeModalEntry(event, index) {
    event.preventDefault();
    let tempEntries = Array.from(modalData.entries);
    if (tempEntries.length > 1) {
      tempEntries.splice(index, 1);
      modalData.entries = tempEntries;
    }
  }

  function setModalWarning(dia, fecha) {}
</script>

<style>
  td {
    color: black;
    text-shadow: 1px 1px lightgrey;
  }
  tr.monday {
    background-color: #a3afaa;
  }
  tr.tuesday {
    background-color: #b9b2c2;
  }
  tr.wednesday {
    background-color: #abd2a9;
  }
  tr.thursday {
    background-color: #b9bebc;
  }
  tr.friday {
    background-color: #4bbec1;
  }
  tr.saturday {
    background-color: lightsalmon;
  }
  tr.sunday {
    background-color: lightcoral;
  }
</style>

<div class="container">
  <div class="row">
    <div class="col">
      {#each $issues as issue}
        <h5>
          Total de horas para {issue.subject} : {sumBy( filter(
              timeEntries,
              function (o) {
                return o.issue.id == issue.id;
              }
            ), 'hours' )}
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
          {#each timeEntries as timeEntry, index}
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
    tabindex="-1"
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
                        <option value={issue.id}>{issue.subject}</option>
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
