<script lang="ts">
  import { onMount } from "svelte";
  import format from "date-fns/format";
  import startOfMonth from "date-fns/startOfMonth";
  import endOfMonth from "date-fns/endOfMonth";
  import { user } from "../stores/userstore";
  import { teamMembers } from "../stores/teammemberstore";
  import type ITeamEntriesReport from "../interfaces/ITeamEntriesReport";
  import { each } from "svelte/internal";
  import { memoize } from "lodash";
  import TeamMembers from "./TeamMembers.svelte";
  let from: Date;
  let to: Date;
  let teamEntriesReport: Array<ITeamEntriesReport>;
  $: from = new Date();
  $: to = new Date();
  $: teamEntriesReport = [];
  onMount(async () => {
    const now = new Date();
    if (now.getDate() > 15) {
      from = new Date(now.getFullYear(), now.getMonth(), 16);
      to = endOfMonth(now);
    } else {
      from = startOfMonth(now);
      to = new Date(now.getFullYear(), now.getMonth(), 15);
    }
    await refreshTimeEntries();
  });

  async function refreshTimeEntries(): Promise<void> {
    const payload = new FormData();
    payload.append("From", format(from, "yyyy-MM-dd"));
    payload.append("To", format(to, "yyyy-MM-dd"));
    $teamMembers.forEach((m) => payload.append("TeamMembers", m.toString()));
    const res = await fetch("/api/redmine/teamtimeentries", {
      method: "POST",
      headers: {
        "Redmine-Key": `${$user.api_key}`,
      },
      body: payload,
    });
    if (res.ok === true) {
      teamEntriesReport = await res.json();
    }
  }
</script>

<div class="container">
  <div class="row">
    <div class="col">
      <h2>
        Time entries report for period
        <small class="text-dark bg-info"
          >{format(from, "EEEE, yyyy-MM-dd")}</small
        >
        to
        <small class="text-dark bg-info">{format(to, "EEEE, yyyy-MM-dd")}</small
        >
      </h2>
      <ul>
        {#each teamEntriesReport as project}
          <li>
            {project.project}
            <ul>
              {#each project.memberHours as member}
                <li>{member.name} Hours:{member.hours}</li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
