import React, { useState } from 'react';

export function IssueProjectPickerComponent({ data, value, onChange }) {
    const [selectionType, setSelectionType] = useState(value?.type || '');
    const [selectedId, setSelectedId] = useState(value?.id || '');

    const handleTypeChange = (e) => {
        setSelectionType(e.target.value);
        setSelectedId('');
        onChange({ type: e.target.value, id: '' });
    };

    const handleIdChange = (e) => {
        setSelectedId(e.target.value);
        onChange({ type: selectionType, id: e.target.value });
    };

    return (
        <div className="d-flex gap-2">
            <select
                value={selectionType}
                onChange={handleTypeChange}
                className="form-control"
            >
                <option value="">Select Type</option>
                <option value="issue">Issue</option>
                <option value="project">Project</option>
            </select>

            {selectionType === 'issue' && (
                <select
                    value={selectedId}
                    onChange={handleIdChange}
                    className="form-control"
                >
                    <option value="">Select Issue</option>
                    {data.issues.map(issue => (
                        <option key={issue.id} value={issue.id}>
                            #{issue.id} - {issue.subject}
                        </option>
                    ))}
                </select>
            )}

            {selectionType === 'project' && (
                <select
                    value={selectedId}
                    onChange={handleIdChange}
                    className="form-control"
                >
                    <option value="">Select Project</option>
                    {data.projects.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
