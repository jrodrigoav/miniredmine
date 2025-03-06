import { useState, useEffect } from 'react';

export const useTimeEntries = (user, dateRange) => {
  const [timeEntries, setTimeEntries] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!user || !dateRange.from || !dateRange.to) {
      return; // Don't run the fetch if any necessary data is missing
    }
  
    const fetchData = async () => {
      try {
        const timeEntriesRes = await fetch(`/api/redmine/timeentries?userId=${user.id}&from=${dateRange.from}&to=${dateRange.to}`, {
          headers: { 'Redmine-Key': user.api_key },
        });
        if (timeEntriesRes.ok) {
          setTimeEntries(await timeEntriesRes.json());
        } else {
          console.error('Failed to fetch time entries:', timeEntriesRes);
        }
  
        const activitiesRes = await fetch('/api/redmine/timeentryactivities', {
          headers: { 'Redmine-Key': user.api_key },
        });
        if (activitiesRes.ok) {
          setActivities(await activitiesRes.json());
        } else {
          console.error('Failed to fetch activities:', activitiesRes);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, [user, dateRange]); // Depend on user and dateRange
  

  return { timeEntries, activities };
};
