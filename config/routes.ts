export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录页',
            path: '/user/login',
            component: '@/pages/User/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎页',
    icon: 'smile',
    component: '@/pages/Welcome',
  },
  {
    path: '/article',
    name: '文章',
    icon: 'profile',
    component: '@/pages/ArticleList',
  },
  {
    path: '/article-detail/:id',
    component: '@/pages/ArticleDetail',
  },
  {
    path: '/article-detail',
    component: '@/pages/ArticleDetail',
  },
  {
    path: '/tag',
    name: '标签',
    icon: 'tags',
    component: '@/pages/TagList',
  },
  {
    path: '/category',
    name: '分类',
    icon: 'paperClip',
    component: '@/pages/CategoryList',
  },
  {
    path: '/changelog',
    name: '建站日志',
    icon: 'file',
    component: '@/pages/ChangelogList',
  },
  {
    path: '/link',
    name: '友链',
    icon: 'link',
    component: '@/pages/LinkList',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    component: '@/pages/Admin',
    routes: [
      {
        component: '@/pages/404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
