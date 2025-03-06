import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'REDMINE_USER_COMMENTS';

export function TimeEntryCommentsComponent() {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setComments(parsed);
            } catch (err) {
                console.error('Failed to parse stored comments:', err);
                setComments([]); // Reset if corrupt data found
            }
        }
    }, []);

    const updateStorage = (updatedComments) => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedComments));
        } catch (err) {
            console.error('Failed to update localStorage:', err);
        }
    };

    const handleAddComment = (e) => {
        e.preventDefault();

        if (comment.trim()) {
            const updatedComments = [...comments, comment.trim()];
            setComments(updatedComments);
            updateStorage(updatedComments);
            setComment('');
        }
    };

    const handleRemoveComment = (index) => {
        const updatedComments = comments.filter((_, i) => i !== index);
        setComments(updatedComments);
        updateStorage(updatedComments);
    };

    return (
        <div className="col">
            <form onSubmit={handleAddComment} className="row gy-2 align-items-center">
                <div className="col-auto">
                    <label htmlFor="comment" className="form-label">Comment</label>
                    <input
                        type="text"
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"
                        maxLength={250}
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-success mt-4">
                        <i className="fas fa-plus-circle" /> Add Comment
                    </button>
                </div>
            </form>

            <div className="mt-3">
                <h5>Comments</h5>
                <ul className="list-group">
                    {comments.map((comment, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            {comment}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleRemoveComment(index)}
                            >
                                <i className="fas fa-trash" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
