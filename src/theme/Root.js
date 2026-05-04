import React, { useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';

const SUPABASE_URL = 'https://dwomscmghytfrddmiiab.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b21zY21naHl0ZnJkZG1paWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjUyMDAsImV4cCI6MjA5MjcwMTIwMH0.keRmO-gna7VfmKIMNKKlxrs2I5Kt6fv7qLDfvQbjFr0';

function supa(path, opts = {}) {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      ...opts.headers,
    },
  });
}

function PageTracker() {
  const location = useLocation();
  const prevPath = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === prevPath.current) return;
    prevPath.current = path;

    // 每个页面每次 session 只记录一次
    const key = `zxr_v_${path}`;
    if (sessionStorage.getItem(key)) return;

    (async () => {
      try {
        const { ip } = await fetch('https://api.ipify.org?format=json').then(r => r.json());
        await supa('visits', {
          method: 'POST',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ ip, page: path }),
        });
        sessionStorage.setItem(key, '1');
      } catch {}
    })();
  }, [location.pathname]);

  return null;
}

export default function Root({ children }) {
  return (
    <>
      <PageTracker />
      {children}
    </>
  );
}
