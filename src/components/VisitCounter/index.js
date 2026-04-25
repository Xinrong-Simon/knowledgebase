import React, { useEffect, useState } from 'react';
import styles from './index.module.css';

// ══════════════════════════════════════════════════════════════
//  Supabase 配置 —— 请替换为你自己的值
//  设置步骤见下方注释
// ══════════════════════════════════════════════════════════════
//
//  1. 访问 https://supabase.com 注册免费账号
//  2. 新建项目（任意名称），等待初始化完成
//  3. 进入左侧 "SQL Editor"，粘贴并执行：
//
//     CREATE TABLE visits (
//       id         BIGSERIAL PRIMARY KEY,
//       ip         TEXT,
//       created_at TIMESTAMPTZ DEFAULT NOW()
//     );
//     ALTER TABLE visits DISABLE ROW LEVEL SECURITY;
//
//  4. 进入 Settings → API，复制：
//       - Project URL  → 填入 SUPABASE_URL
//       - anon public  → 填入 SUPABASE_KEY
//
// ══════════════════════════════════════════════════════════════
const SUPABASE_URL = 'https://dwomscmghytfrddmiiab.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b21zY21naHl0ZnJkZG1paWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjUyMDAsImV4cCI6MjA5MjcwMTIwMH0.keRmO-gna7VfmKIMNKKlxrs2I5Kt6fv7qLDfvQbjFr0';
// ══════════════════════════════════════════════════════════════

const READY = !SUPABASE_URL.includes('YOUR_PROJECT_ID');
const PER_PAGE = 10;

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

export default function VisitCounter() {
  const [count, setCount] = useState(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!READY) return;
    (async () => {
      try {
        // 同一 session 只记录一次
        if (!sessionStorage.getItem('zxr_v')) {
          const { ip } = await fetch('https://api.ipify.org?format=json').then(r => r.json());
          await supa('visits', {
            method: 'POST',
            headers: { Prefer: 'return=minimal' },
            body: JSON.stringify({ ip }),
          });
          sessionStorage.setItem('zxr_v', '1');
        }
        // 查询总数
        const r = await supa('visits', {
          method: 'HEAD',
          headers: { Prefer: 'count=exact' },
        });
        const cr = r.headers.get('Content-Range');
        const n = cr ? parseInt(cr.split('/')[1], 10) : null;
        setCount(n);
        setTotal(n ?? 0);
      } catch (e) {
        setErr('计数器暂时不可用');
      }
    })();
  }, []);

  const loadPage = async (p) => {
    setBusy(true);
    try {
      const r = await supa(
        `visits?select=ip,created_at&order=created_at.desc&limit=${PER_PAGE}&offset=${p * PER_PAGE}`,
        { headers: { Prefer: 'count=exact' } }
      );
      const data = await r.json();
      const cr = r.headers.get('Content-Range');
      if (cr) setTotal(parseInt(cr.split('/')[1], 10));
      setRows(data);
      setPage(p);
    } catch {
      setRows([]);
    } finally {
      setBusy(false);
    }
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) loadPage(0);
  };

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  if (!READY) {
    return (
      <div className={styles.wrap}>
        <span className={styles.uncfg}>
          ℹ️ 访问计数器未配置 — 请在 <code>src/components/VisitCounter/index.js</code> 填入 Supabase 配置
        </span>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {/* 计数行 */}
      <div className={styles.bar}>
        <span className={styles.icon}>👁</span>
        <span className={styles.label}>累计访问</span>
        <span className={styles.num}>{err ? '—' : (count ?? '…')}</span>
        <span className={styles.label}>次</span>
        <button className={styles.ipBtn} onClick={toggle}>
          {open ? '▲ 收起' : '📋 IP 记录'}
        </button>
      </div>

      {/* IP 记录面板 */}
      {open && (
        <div className={styles.panel}>
          <div className={styles.phead}>
            <strong>访客 IP 记录</strong>
            <span className={styles.pageInfo}>
              第 {page + 1} / {totalPages} 页 &nbsp;·&nbsp; 共 {total} 条
            </span>
          </div>

          {busy ? (
            <div className={styles.loading}>加载中…</div>
          ) : (
            <table className={styles.tbl}>
              <thead>
                <tr>
                  <th>序号</th>
                  <th>IP 地址</th>
                  <th>访问时间（北京时间）</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((v, i) => (
                  <tr key={i}>
                    <td className={styles.seq}>{page * PER_PAGE + i + 1}</td>
                    <td><code className={styles.ip}>{v.ip}</code></td>
                    <td className={styles.ts}>
                      {new Date(v.created_at).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={3} className={styles.empty}>暂无访问记录</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          <div className={styles.pager}>
            <button
              className={styles.pageBtn}
              disabled={page === 0 || busy}
              onClick={() => loadPage(page - 1)}
            >
              ← 上一页
            </button>
            <span className={styles.pageNum}>{page + 1} / {totalPages}</span>
            <button
              className={styles.pageBtn}
              disabled={page >= totalPages - 1 || busy}
              onClick={() => loadPage(page + 1)}
            >
              下一页 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
