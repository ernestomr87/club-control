"use client";

import React from "react";
import { Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { MENU_ITEMS } from "./constants";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="shadow-xl z-10"
      style={{
        background: colorBgContainer,
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
      width={260}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-100">
        <div
          className={`font-bold text-xl transition-all duration-300 ${
            collapsed ? "scale-0 w-0" : "scale-100"
          }`}
        >
          <span className="text-blue-600">Club</span>Control
        </div>
        {collapsed && <div className="text-blue-600 font-bold text-xl">CC</div>}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        items={MENU_ITEMS}
        onClick={({ key }) => router.push(key)}
        className="border-none mt-4"
        style={{ background: "transparent", height: "100%", borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;
