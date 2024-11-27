'use client';
import React, { useEffect } from 'react';
import { useAuthState } from './store/AuthState';

export default function ClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeState = useAuthState((state) => state.initializeState);
  const { user } = useAuthState();

  useEffect(() => {
    if (!user) {
      initializeState();
    }
  }, [user, initializeState]);

  return <>{children}</>;
}
