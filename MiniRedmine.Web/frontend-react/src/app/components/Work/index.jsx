import React, { useState, useEffect } from 'react';
import { useUser } from '../../providers/User';
import { WorkTable } from '../WorkTable';

const STORAGE_KEY = 'REDMINE_USER_WORK';

export function WorkComponent() {
    const [issueId, setIssueId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [userWork, setUserWork] = useState({ issues: [], projects: [] });
    const { user } = useUser();

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);

                if (Array.isArray(parsed)) {
                    // Backward compatibility: old format was just an array of issues
                    setUserWork({ issues: parsed, projects: [] });
                } else {
                    // New format: object with both issues and projects
                    setUserWork(parsed);
                }
            } catch (err) {
                console.error('Failed to parse stored work items:', err);
                setUserWork({ issues: [], projects: [] }); // Reset if corrupt data found
            }
        }
    }, []);

    const updateStorage = (updatedWorkItems) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkItems));
        } catch (err) {
            console.error('Failed to update localStorage:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isIssue = !!issueId;
        const endpoint = isIssue
            ? `/api/redmine/issue/${issueId}`
            : `/api/redmine/project/${projectId}`;

        const res = await fetch(endpoint, {
            headers: { 'Redmine-Key': user.api_key }
        });

        if (res.ok) {
            const result = await res.json();
            const updated = { ...userWork };

            const targetArray = isIssue ? Array.from(updated.issues) : Array.from(updated.projects);

            if (targetArray.some(item => item.id === result.id)) {
                console.warn(`${isIssue ? 'Issue' : 'Project'} ${result.id} already exists.`);
                return; // No need to add duplicate
            }

            targetArray.push(result);

            isIssue ? updated.issues = targetArray : updated.projects = targetArray;

            updateStorage(updated);
            setIssueId('');
            setProjectId('');
        } else {
            console.error('Failed to fetch', res.status);
        }
    };

    const handleRemove = (id, type) => {
        const updated = { ...userWork };
        if (type === 'issue') {
            updated.issues = updated.issues.filter(i => i.id !== id);
        } else {
            updated.projects = updated.projects.filter(p => p.id !== id);
        }
        updateStorage(updated);
    };

    return (
        <div className='col'>
            <form onSubmit={handleSubmit} className="row gy-2 align-items-center">
                <div className="col-auto">
                    <label htmlFor="issueId" className="form-label">Issue ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="issueId"
                        value={issueId}
                        onChange={(e) => setIssueId(e.target.value)}
                        min="1"
                        max="9999999"
                        disabled={!!projectId}
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor="projectId" className="form-label">Project ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        min="1"
                        max="9999999"
                        disabled={!!issueId}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-success mt-4">
                        <i className="fas fa-plus-circle" /> Search and Add
                    </button>
                </div>
            </form>

            <WorkTable workItems={userWork} onRemove={handleRemove} />
        </div>
    );
}
