'use client';
import { useEffect } from 'react';

export default function AdminPanel() {
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      sessionStorage.setItem('hasRefreshed', 'true');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, []);

  return null;
}
