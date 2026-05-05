(function () {
  var SB_URL = 'https://dwomscmghytfrddmiiab.supabase.co';
  var SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b21zY21naHl0ZnJkZG1paWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjUyMDAsImV4cCI6MjA5MjcwMTIwMH0.keRmO-gna7VfmKIMNKKlxrs2I5Kt6fv7qLDfvQbjFr0';

  function post(body) {
    return fetch(SB_URL + '/rest/v1/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SB_KEY,
        'Authorization': 'Bearer ' + SB_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(body)
    });
  }

  function track(pathname) {
    var key = 'zxr_v_' + pathname;
    try {
      if (sessionStorage.getItem(key)) return;
    } catch (e) { return; }

    fetch('https://api.ipify.org?format=json')
      .then(function (r) { return r.json(); })
      .then(function (d) {
        return post({ ip: d.ip, page: pathname })
          .then(function (r) {
            if (!r.ok) return post({ ip: d.ip }); // page 列不存在时降级
            return r;
          });
      })
      .then(function (r) {
        if (r && r.ok) {
          try { sessionStorage.setItem(key, '1'); } catch (e) {}
        }
      })
      .catch(function () {});
  }

  // 追踪当前页面
  track(location.pathname);

  // 拦截 SPA 跳转（Docusaurus 使用 history.pushState）
  var origPush = history.pushState.bind(history);
  history.pushState = function () {
    origPush.apply(history, arguments);
    track(location.pathname);
  };

  window.addEventListener('popstate', function () {
    track(location.pathname);
  });
})();
