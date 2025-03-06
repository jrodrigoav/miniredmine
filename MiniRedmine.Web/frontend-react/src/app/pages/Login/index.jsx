import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUser } from '../../providers/User';

export function LoginPage() {
  const { setUser } = useUser(); // Update user context
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/redmine/userinfo', {
        headers: {
          'Redmine-Key': `${apiKey}`,
        },
      });

      if (res.ok) {
        const userInfo = await res.json();
        setUser({ ...userInfo, isAuthenticated: true }); // Update context
        localStorage.setItem('REDMINE_USER', JSON.stringify(userInfo)); // Persist user
        navigate('/'); // Navigate to home
      } else {
        console.error('Failed to login: ', res.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="apikey">Redmine API Key</label>
            <input
              type="text"
              className="form-control"
              id="apikey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
