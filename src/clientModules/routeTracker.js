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

async function trackPageView(pathname) {
  const key = `zxr_v_${pathname}`;
  if (sessionStorage.getItem(key)) return;
  try {
    const { ip } = await fetch('https://api.ipify.org?format=json').then(r => r.json());
    await supa('visits', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ ip, page: pathname }),
    });
    sessionStorage.setItem(key, '1');
  } catch {}
}

// Docusaurus 官方生命周期钩子，每次路由切换完成时触发（含首次加载）
export function onRouteDidUpdate({ location, previousLocation }) {
  if (!previousLocation || location.pathname !== previousLocation.pathname) {
    trackPageView(location.pathname);
  }
}
