// context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const _REDMINE_USER = 'REDMINE_USER';
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(_REDMINE_USER);
    return storedUser ? JSON.parse(storedUser) : { isAuthenticated: null };
  });

  useEffect(() => {
    localStorage.setItem(_REDMINE_USER, JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ Correct export for useUser
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
