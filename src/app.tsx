import { PageLoading } from '@ant-design/pro-layout';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { history, Link, useDispatch, useSelector } from 'umi';
import RightContent from '@/components/RightContent';
import { namespace, queryCurrentUserEffect } from '@/models/index';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login/';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export const getInitialState = async () => {
  const dispatch = useDispatch();
  const dada = useSelector((state: any) => state[namespace]);

  console.log(dada);

  const fetchUserInfo = () => {
    dispatch({
      type: queryCurrentUserEffect,
      payload: {},
    });
    return undefined;
  };

  // 当前页非登录页
  if (history.location.pathname !== loginPath) {
    dispatch({
      type: queryCurrentUserEffect,
      payload: {},
    });
    return {
      fetchUserInfo,
      currentUser: dada,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
};

export const layout = ({ initialState }: any) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // onPageChange: () => {
    //   // 如果没有登录，重定向到 login
    //   const { location } = history;
    //   if (!initialState?.currentUser && location.pathname !== loginPath) {
    //     history.push(loginPath);
    //   }
    // },
    links: isDev
      ? [
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: <div>您没有权限进入此页面</div>,
    ...initialState?.settings,
  };
};

/** dva调用接口处理错误 */
export const dva = {
  config: {
    onError(e: any) {
      e.preventDefault();
      console.error(e.message);
    },
  },
};
