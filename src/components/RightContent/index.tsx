import { Space, Tooltip } from "antd";
import { useModel } from "umi";
import styles from "./index.less";
import { useState } from "react";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import Notice from "../Notice";
import AvatarDropdown from "../AvatarDropdown";

const GlobalHeaderRight = () => {
  const { initialState } = useModel("@@initialState");
  const [loading, setLoading] = useState<boolean>(false);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === "dark" && layout === "top") || layout === "mix") {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space align="center" size={"middle"}>
      <Tooltip title="搜索">
        <SearchOutlined style={{ cursor: "pointer" }} />
      </Tooltip>
      <Tooltip title="主页">
        <span
          className={styles.action}
          onClick={() => {
            window.open("https://github.com/Galakoi");
          }}
        >
          <HomeOutlined style={{ cursor: "pointer" }} />
        </span>
      </Tooltip>
      <Tooltip title="消息">
        <Notice />
      </Tooltip>
      <AvatarDropdown />
    </Space>
  );
};

export default GlobalHeaderRight;
