// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ZXR知识库',
  tagline: '个人知识库 · 记录所思所学',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  url: 'https://Xinrong-Simon.github.io',
  baseUrl: '/knowledgebase/',

  organizationName: 'Xinrong-Simon',
  projectName: 'knowledgebase',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'current-affairs',
        routeBasePath: 'current-affairs',
        path: './current-affairs',
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        editUrl: 'https://github.com/Xinrong-Simon/knowledgebase/edit/main/',
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Xinrong-Simon/knowledgebase/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/Xinrong-Simon/knowledgebase/edit/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'ZXR知识库',
        logo: {
          alt: 'ZXR知识库 Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '知识库',
          },
          {to: '/blog', label: '随笔', position: 'left'},
          {to: '/current-affairs', label: '时事分析', position: 'left'},
          {to: '/games', label: '游戏', position: 'left'},
          {
            href: 'https://github.com/Xinrong-Simon/knowledgebase',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '知识库',
            items: [
              {
                label: '投资研究',
                to: '/docs/investment-research/finland-startups-2025',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '随笔',
                to: '/blog',
              },
              {
                label: '时事分析',
                to: '/current-affairs',
              },
              {
                label: '游戏',
                to: '/games',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Xinrong-Simon/knowledgebase',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Xinrong Zhou · Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
