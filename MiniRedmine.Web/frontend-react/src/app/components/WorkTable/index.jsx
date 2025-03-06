import React from 'react';

export function WorkTable({ workItems, onRemove }) {
    return (
        <table className="table table-striped mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {workItems.issues.map(issue => (
                    <tr key={`issue-${issue.id}`}>
                        <td>{issue.id}</td>
                        <td>{issue.subject}</td>
                        <td>Issue</td>
                        <td>
                            <button className="btn btn-sm btn-danger" onClick={() => onRemove(issue.id, 'issue')}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
                {workItems.projects.map(project => (
                    <tr key={`project-${project.id}`}>
                        <td>{project.id}</td>
                        <td>{project.name}</td>
                        <td>Project</td>
                        <td>
                            <button className="btn btn-sm btn-danger" onClick={() => onRemove(project.id, 'project')}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
