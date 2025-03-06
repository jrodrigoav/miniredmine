import React, { useState } from 'react';
import { useUser } from '../../providers/User';
import { IssueProjectPickerComponent } from '../IssueProjectPicker';

export function TimeEntryFormComponent({ userWork, date, activities, onEntrySaved }) {
    const { user } = useUser();

    const [form, setForm] = useState({
        activityId: '',
        comments: '',
        hours: '',
        issueOrProjectId: {},
        spentOn: date,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.activityId || !form.comments || !form.hours) {
            alert('Please fill all required fields');
            return;
        }

        if (form.comments.length > 250) {
            alert('Comments must be 250 characters or less');
            return;
        }

        const payload = form.issueOrProjectId.type === 'issue' ?
            {
                spent_on: form.spentOn,
                hours: parseFloat(form.hours),
                comments: form.comments,
                activity: parseInt(form.activityId, 10),
                issue: form.issueOrProjectId.id
            } :
            {
                spent_on: form.spentOn,
                hours: parseFloat(form.hours),
                comments: form.comments,
                activity: parseInt(form.activityId, 10),
                project: form.issueOrProjectId.id
            };
        const endpoint = form.issueOrProjectId.type === 'issue' ? '/api/redmine/issue/timeentries' : '/api/redmine/project/timeentries';

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Redmine-Key': user.api_key
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            onEntrySaved();
            setForm({
                activityId: '',
                comments: '',
                hours: '',
                issueOrProjectId: '',
                spentOn: date
            });
        } else {
            console.error('Failed to save time entry');
            alert('Failed to save entry');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select
                name="activityId"
                value={form.activityId}
                onChange={handleChange}
                className="form-control mb-1"
                required
            >
                <option value="">Select Activity</option>
                {activities.map(act => (
                    <option key={act.id} value={act.id}>
                        {act.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                name="comments"
                placeholder="Comments (max 250 chars)"
                value={form.comments}
                onChange={handleChange}
                className="form-control mb-1"
                maxLength={250}
                list="comments-suggestions"  // Associate the input with the datalist
                required
            />

            <input
                type="number"
                name="hours"
                placeholder="Hours (0 - 24)"
                value={form.hours}
                onChange={handleChange}
                className="form-control mb-1"
                min={0}
                max={24}
                step={0.5}
                required
            />

            <IssueProjectPickerComponent
                data={userWork}
                value={form.issueOrProject}
                onChange={(value) => setForm(prev => ({ ...prev, issueOrProjectId: value }))}
            />

            <input
                type="text"
                value={date}
                className="form-control mb-1"
                readOnly
            />

            <button type="submit" className="btn btn-primary btn-sm">Save</button>
        </form>
    );
}
