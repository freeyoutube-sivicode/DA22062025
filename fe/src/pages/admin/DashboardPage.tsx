import { Card, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";

interface DashboardStats {
  totalOrders: number;
  totalUsers: number;
  totalTestDrives: number;
  totalRevenue: number;
}

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalUsers: 0,
    totalTestDrives: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={styles.dashboardPage}>
      <Title level={2} className={styles.dashboardTitle}>
        Thống kê tổng quan
      </Title>
      <div className={styles.dashboardStatsGrid}>
        <Card className={styles.statCard}>
          <p className={styles.statCardTitle}>Tổng đơn hàng</p>
          <p className={styles.statCardValue}>{stats.totalOrders}</p>
        </Card>

        <Card className={styles.statCard}>
          <p className={styles.statCardTitle}>Tổng người dùng</p>
          <p className={styles.statCardValue}>{stats.totalUsers}</p>
        </Card>

        <Card className={styles.statCard}>
          <p className={styles.statCardTitle}>Lái thử xe</p>
          <p className={styles.statCardValue}>{stats.totalTestDrives}</p>
        </Card>

        <Card className={styles.statCard}>
          <p className={styles.statCardTitle}>Doanh thu</p>
          <p className={styles.statCardValue}>
            {stats.totalRevenue.toLocaleString("vi-VN")} VNĐ
          </p>
        </Card>
      </div>

      {/* Add more dashboard content here (e.g., recent orders, low stock products) */}
      <div style={{ marginTop: "40px" }}>
        {/* Example: Recent Orders Section */}
        <Title level={3}>Đơn hàng gần đây</Title>
        {/* Table or List of Recent Orders */}
        <Card>
          <p>Danh sách đơn hàng gần đây sẽ hiển thị ở đây.</p>
        </Card>

        {/* Example: Low Stock Products Section */}
        <Title level={3} style={{ marginTop: "20px" }}>
          Sản phẩm tồn kho thấp
        </Title>
        <Card>
          <p>Danh sách sản phẩm tồn kho thấp sẽ hiển thị ở đây.</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
