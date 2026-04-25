import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const GAMES = [
  {
    id: 'tetris',
    title: '俄罗斯方块',
    desc: '经典方块消除游戏 · 连续超过3块触发 ZXR 模式',
    src: '/knowledgebase/games/tetris.html',
    emoji: '🧱',
  },
  {
    id: 'needle',
    title: '见缝插针',
    desc: '旋转的球 · 发射银针插满为止 · 碰到已有的针即结束',
    src: '/knowledgebase/games/needle-game.html',
    emoji: '🪡',
  },
];

export default function Games() {
  const [active, setActive] = useState(null);

  return (
    <Layout title="游戏" description="ZXR 游戏中心">
      <div className={styles.page}>
        <h1 className={styles.title}>游戏中心</h1>
        <div className={styles.grid}>
          {GAMES.map(g => (
            <div
              key={g.id}
              className={`${styles.card} ${active === g.id ? styles.cardActive : ''}`}
              onClick={() => setActive(active === g.id ? null : g.id)}
            >
              <div className={styles.emoji}>{g.emoji}</div>
              <div className={styles.cardTitle}>{g.title}</div>
              <div className={styles.cardDesc}>{g.desc}</div>
              <div className={styles.btn}>{active === g.id ? '收起' : '开始游戏'}</div>
            </div>
          ))}
        </div>

        {active && (
          <div className={styles.frameWrap}>
            <iframe
              key={active}
              src={GAMES.find(g => g.id === active).src}
              className={styles.frame}
              title={GAMES.find(g => g.id === active).title}
              allowFullScreen
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
