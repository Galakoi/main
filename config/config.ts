import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  base: '/',
  // 生成hash文件名
  hash: true,
  // antd配置
  antd: {},
  dva: {
    hmr: true,
    immer: true,
    lazyLoad: true,
  },
  layout: {
    siderWidth: 208,
    ...defaultSettings,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // 最低兼容至ie 11版本
  targets: {
    ie: 11,
  },
  // 路由
  routes,
  // 主题色
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // 浏览器顶部不显示title
  title: false,
  // 是否忽视
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  publicPath: '/',
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
