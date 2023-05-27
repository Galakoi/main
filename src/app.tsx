import { PageLoading } from "@ant-design/pro-layout";
import { BookOutlined, LinkOutlined } from "@ant-design/icons";
import { history, Link, useDispatch, useSelector } from "umi";
import type { RunTimeLayoutConfig } from "umi";
import RightContent from "@/components/RightContent";
import { queryCurrentUser } from "./services/user";
import { message } from "antd";

const isDev = process.env.NODE_ENV === "development";
const loginPath = "/user/login/";

export const initialStateConfig = {
  loading: <PageLoading />,
};

export const getInitialState = async () => {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      message.error("请先登录！");
      history.push(loginPath);
    }

    return undefined;
  };

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
};

export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    menuDataRender: (menus) => {
      return menus.map((item) => {
        return {
          ...item,
        };
      });
    },
    menuItemRender: (menu, dom) => {
      if (menu.isUrl) {
        return dom;
      }
      const linkProps = {
        to: menu.path || "/404",
        target: menu.target,
        rel: "opener",
      };
      return <Link {...linkProps}>{dom}</Link>;
    },
    // 水印相关设置
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
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
