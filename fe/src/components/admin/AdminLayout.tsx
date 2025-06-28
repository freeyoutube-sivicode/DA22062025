import {
  CarryOutOutlined,
  DashboardOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TagsOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Space } from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import ThemeController from "../ThemeController";
import styles from "./AdminLayout.module.css"; // Import CSS module

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      handleLogout();
    }
  };

  // Determine selected menu key based on current path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith("/admin/products")) return "products";
    if (path.startsWith("/admin/orders")) return "orders";
    if (path.startsWith("/admin/users")) return "users";
    if (path.startsWith("/admin/categories")) return "categories";
    if (path.startsWith("/admin/services")) return "services";
    if (path.startsWith("/admin/test-drive-bookings"))
      return "test-drive-bookings";
    return "dashboard"; // Default to dashboard
  };

  // Menu items configuration using new items API
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "products",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/products">Sản phẩm</Link>,
    },
    {
      key: "orders",
      icon: <CarryOutOutlined />,
      label: <Link to="/admin/orders">Đơn hàng</Link>,
    },
    {
      key: "categories",
      icon: <TagsOutlined />,
      label: <Link to="/admin/categories">Danh mục</Link>,
    },
    {
      key: "services",
      icon: <DashboardOutlined />,
      label: <Link to="/admin/services">Dịch vụ</Link>,
    },
    {
      key: "test-drive-bookings",
      icon: <CarryOutOutlined />,
      label: <Link to="/admin/test-drive-bookings">Đăng ký lái thử</Link>,
    },
    {
      key: "users",
      icon: <TeamOutlined />,
      label: <Link to="/admin/users">Người dùng</Link>,
    },
  ];

  return (
    <Layout className={styles.adminLayout}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={styles.adminSidebar}
        trigger={null}
      >
        <div className={styles.adminLogo}></div> {/* Replace with your logo */}
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          className={styles.adminMenu}
          items={menuItems}
        />
      </Sider>
      <Layout
        className={`${styles.adminContentLayout} ${collapsed ? styles.collapsed : ""}`}
      >
        <Header className={styles.adminHeader}>
          <div className={styles.headerLeft}>
            <button
              className={styles.sidebarToggle}
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
              title={collapsed ? "Mở rộng menu" : "Thu gọn menu"}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: theme.colors.palette.primary,
                fontSize: "18px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "16px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  theme.colors.background.light;
                e.currentTarget.style.color = theme.colors.palette.primaryDark;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = theme.colors.palette.primary;
              }}
            >
              {collapsed ? (
                <MenuUnfoldOutlined
                  style={{
                    fontSize: "18px",
                    transition: "all 0.2s ease",
                  }}
                />
              ) : (
                <MenuFoldOutlined
                  style={{
                    fontSize: "18px",
                    transition: "all 0.2s ease",
                  }}
                />
              )}
            </button>
          </div>
          <div className={styles.headerUser}>
            {user && (
              <Dropdown
                menu={{ items: userMenuItems, onClick: handleMenuClick }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <a
                  onClick={(e) => e.preventDefault()}
                  className={styles.userDropdownLink}
                >
                  <Space>
                    <UserOutlined />
                    {user.Username} <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </Header>
        <Content className={styles.adminContent}>{children}</Content>
        <Footer className={styles.adminFooter}>
          <div className={styles.footerContent}>
            © {new Date().getFullYear()} - Sản phẩm thuộc về SiVi CODE
          </div>
        </Footer>
      </Layout>
      <ThemeController />
    </Layout>
  );
};

export default AdminLayout;
