// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  history: { type: 'hash' },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'pt-BR',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/workplace',
            },
            {
              path: '/dashboard/workplace',
              name: 'welcome',
              icon: 'Home',
              component: './dashboard/workplace',
            },
            {
              path: '/customers/new',
              name: 'customer',
              icon: 'IdcardOutlined',
              component: './customers/new',
              authority: ['admin'],
            },
            {
              icon: 'FundOutlined',
              name: 'Projetos',
              routes: [
                {
                  path: '/projects/new',
                  name: 'Projeto',
                  // icon: 'smile',
                  component: './projects/new',
                  authority: ['admin']
                },
                {
                  path: '/projects/list',
                  name: 'Todos os Projetos',
                  // icon: 'smile',
                  component: './projects/list',
                  authority: ['admin']
                }
              ]
            },
            // {
            //   path: '/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            //   routes: [
            //     {
            //       path: '/admin/sub-page',
            //       name: 'sub-page',
            //       icon: 'smile',
            //       component: './Welcome',
            //       authority: ['admin'],
            //     },
            //   ],
            // },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    // 'primary-color': defaultSettings.primaryColor,
    // 'menu-dark-bg': '#fa8072',
    'menu-dark-bg': '#f27769',
    'menu-dark-submenu-bg': '#f27769',
    // 'menu-dark-submenu-bg': '#fa8072',
    // 'layout-header-background': '#fa8072',
    'layout-header-background': '#f27769',
    'layout-body-background': '#d9d9d9',
    // 'menu-highlight-color': defaultSettings.primaryColor,
    'menu-dark-item-active-bg': '#cc6a5e',
    // 'menu-dark-highlight-color': defaultSettings.primaryColor,
    // 'menu-dark-selected-item-text-color': defaultSettings.primaryColor,
    'page-header-back-color': '#000000',
    'page-header-ghost-bg': '#fafafa',
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
