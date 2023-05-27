import { Dropdown, Tabs } from "antd";
import type { MenuProps, TabsProps } from "antd";
import { AppleOutlined } from "@ant-design/icons";
import NoticeList from "./components/NoticeList";
import MessageList from "./components/MessageList";
import PendingToDo from "./components/PendingToDo";
import { useState, useRef } from "react";

const Notice = () => {
  const DropdownRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "通知",
      children: <NoticeList />,
    },
    {
      key: "2",
      label: "消息",
      children: <MessageList />,
    },
    {
      key: "3",
      label: "代办",
      children: <PendingToDo />,
    },
  ];

  const menu: MenuProps["items"] = [
    { key: 0, label: <Tabs centered defaultActiveKey="1" items={items} /> },
  ];

  return (
    <Dropdown
      arrow
      trigger={["click"]}
      menu={{ items: menu }}
      overlayStyle={{ width: 350 }}
    >
      <AppleOutlined style={{ fontSize: 16 }} onClick={() => setOpen(!open)} />
    </Dropdown>
  );
};

export default Notice;
