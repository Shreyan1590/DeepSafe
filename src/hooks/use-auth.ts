
'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return user;
}
