import React, { useEffect, useState } from 'react';
import { useUser } from '../../providers/User';
import { TimeEntryFormComponent } from '../../components/TimeEntryForm';
import { formatDateWithDayName, calculateQuincena, calculateDays } from '../../utils/Date';
import { useTimeEntries } from '../../hooks/useTimeEntries';

const STORAGE_KEY = 'REDMINE_USER_WORK';

export function TimeEntriesPage() {
    const { user } = useUser();

    const [days, setDays] = useState([]);
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [userWork, setUserWork] = useState({ issues: [], projects: [] });
    const [commentsSuggestions, setCommentsSuggestions] = useState([]);
    const [showWeekends, setShowWeekends] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUserWork(Array.isArray(parsed) ? { issues: parsed, projects: [] } : parsed);
            } catch (err) {
                console.error('Failed to parse stored work items:', err);
                setUserWork({ issues: [], projects: [] });
            }
        }

        const range = calculateQuincena();
        setDateRange(range);
        setDays(calculateDays(range.from, range.to));

        const storedComments = localStorage.getItem('REDMINE_USER_COMMENTS');
        setCommentsSuggestions(storedComments ? JSON.parse(storedComments) : []);
    }, []);

    const { timeEntries, activities } = useTimeEntries(user, dateRange); // Use custom hook

    const getEntriesForDate = (date) => timeEntries.filter(entry => entry.spent_on === date);

    return (
        <div className="container">
            <h2>Time Entries for ({dateRange.from} to {dateRange.to})</h2>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="showWeekendsToggle"
                    checked={showWeekends}
                    onChange={() => setShowWeekends(!showWeekends)}
                />
                <label className="form-check-label" htmlFor="showWeekendsToggle">
                    Display Weekends
                </label>
            </div>

            {/* Datalist for comments suggestions */}
            <datalist id="comments-suggestions">
                {commentsSuggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                ))}
            </datalist>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Entries</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {days
                        .filter(({ isWeekend }) => showWeekends || !isWeekend)
                        .map(({ date, isWeekend }) => {
                            const entries = getEntriesForDate(date);
                            return (
                                <tr key={date} className={isWeekend ? 'table-warning' : ''}>
                                    <td style={{ whiteSpace: 'pre-wrap' }}>{formatDateWithDayName(date)}</td>
                                    <td>
                                        {entries.length > 0 ? (
                                            <ul className="mb-0">
                                                {entries.map(entry => (
                                                    <li key={entry.id}>
                                                        {entry.project?.name} - {entry.comments} ({entry.hours}h)
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>No entries</span>
                                        )}
                                    </td>
                                    <td>
                                        <TimeEntryFormComponent
                                            userWork={userWork}
                                            date={date}
                                            activities={activities}
                                            onEntrySaved={() => {
                                                // Trigger the hook to refresh time entries
                                                setDateRange((prevRange) => ({
                                                    from: prevRange.from, // Keep the same range
                                                    to: prevRange.to,
                                                }));
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
