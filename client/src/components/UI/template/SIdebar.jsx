import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { adminLogout } from "../../../services/auth.services";
const { Content, Sider } = Layout;
const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const items = [
    {
      key: "0",
      icon: <BarChartOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      key: "1",
      icon: <BarChartOutlined />,
      label: "All Request",
      onClick: () => {
        navigate("/admin/requests");
      },
    },
    {
      key: "2",
      icon: <BarChartOutlined />,
      label: "Driver Request",
      onClick: () => {
        navigate("/admin/driver/requests");
      },
    },
    {
      key: "3",
      icon: <BarChartOutlined />,
      label: "All Driver",
      onClick: () => {
        navigate("/admin/all-driver");
      },
    },
    {
      key: "10",
      icon: <VideoCameraOutlined />,
      label: "Logout",
      onClick: async () => {
        adminLogout();
      },
    },
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "wheat",
            fontWeight: "bold",
            fontSize: 32,
            cursor: "pointer",
          }}
        >
          CarLagbe
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: 200,
          paddingTop: 0,
        }}
      >
        <Content>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
