import React from 'react';
import { useUser } from '../../providers/User';

export function ProtectedWrapperComponent({ children, displayIfAuthenticated = true }) {
  const { user } = useUser();

  const shouldDisplay = displayIfAuthenticated ? user.isAuthenticated : !user.isAuthenticated;

  return shouldDisplay ? <>{children}</> : null;
}
