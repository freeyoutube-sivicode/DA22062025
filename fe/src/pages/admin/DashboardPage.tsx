import { Card, Typography, Row, Col, Spin, Alert, message } from "antd";
import { Column, Area, Pie, Bar } from "@ant-design/charts";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./DashboardPage.module.css";
import {
  UserOutlined,
  UserSwitchOutlined,
  CarOutlined,
  InboxOutlined,
  ProfileOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<any>({
    totalUsers: 0,
    bookedUsers: 0,
  });
  const [productStats, setProductStats] = useState<any>({
    totalProducts: 0,
    availableProducts: 0,
    outOfStockProducts: 0,
  });
  const [orderStats, setOrderStats] = useState<any>({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalAmount: 0,
  });
  const [topCars, setTopCars] = useState<any[]>([]);
  const [registrationsByDate, setRegistrationsByDate] = useState<any[]>([]);
  const [chartError, setChartError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("/api/thong-ke/dashboard");
        const data = res.data.data;
        setUserStats(data.userStats);
        setProductStats(data.productStats);
        setOrderStats(data.orderStats);
        setTopCars(data.topCars);
        setRegistrationsByDate(data.registrationsByDate);
      } catch (error) {
        setError("Không thể tải dữ liệu thống kê. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Prepare data for pie chart (order status)
  const orderStatusData = [
    { type: "Chờ xác nhận", value: Number(orderStats.pendingOrders) || 0 },
    { type: "Đã duyệt", value: Number(orderStats.confirmedOrders) || 0 },
    { type: "Hoàn tất", value: Number(orderStats.completedOrders) || 0 },
    { type: "Đã hủy", value: Number(orderStats.cancelledOrders) || 0 },
  ].filter(
    (item) =>
      typeof item.value === "number" &&
      item.value > 0 &&
      typeof item.type === "string" &&
      !!item.type &&
      item.type !== "undefined" &&
      item.type !== "defined"
  );

  // Top 4 xe: Column chart
  const palette = [
    "#1890ff",
    "#52c41a",
    "#faad14",
    "#ff4d4f",
    "#13c2c2",
    "#722ed1",
  ];
  const topCarsData = (topCars || []).map((item: any, idx: number) => ({
    carName: typeof item.carName === "string" ? item.carName : "",
    count:
      typeof item.count === "number" && !isNaN(item.count) ? item.count : 0,
    colorKey: `car${idx}`,
  }));
  const columnConfig = {
    data: topCarsData,
    xField: "carName",
    yField: "count",
    colorField: "colorKey",
    color: palette,
    columnWidthRatio: 0.5,
    label: {
      position: "top",
      content: (data: any) =>
        typeof data.count === "number" && !isNaN(data.count)
          ? `${data.count}`
          : "",
      style: { fontWeight: 600, fontSize: 16, fill: "#fff" },
    },
    xAxis: {
      label: { autoHide: false, autoRotate: true, style: { fontSize: 14 } },
    },
    yAxis: { label: { style: { fontSize: 14 } } },
    tooltip: {
      showMarkers: false,
      show: false,
    },
  };

  // Lượt đăng ký: Area chart
  const areaConfig = {
    data: (registrationsByDate || []).map((item) => {
      let label = "";
      if (typeof item._id === "string" && item._id.length >= 10) {
        // _id dạng YYYY-MM-DD
        const [y, m, d] = item._id.split("-");
        label = `${d}/${m}/${y}`;
      }
      return {
        _id: label,
        shortLabel: label ? label.slice(0, 5) : "", // DD/MM
        count:
          typeof item.count === "number" && !isNaN(item.count) ? item.count : 0,
      };
    }),
    xField: "shortLabel",
    yField: "count",
    color: "#52c41a",
    areaStyle: { fillOpacity: 0.2 },
    line: { color: "#52c41a" },
    point: { size: 4, shape: "circle", style: { fill: "#52c41a" } },
    xAxis: {
      label: {
        style: { fontSize: 13 },
      },
      title: { text: "Ngày", style: { fontWeight: 600, fontSize: 14 } },
    },
    yAxis: {
      title: {
        text: "Số lượt đăng ký",
        style: { fontWeight: 600, fontSize: 14 },
      },
      label: { style: { fontSize: 13 } },
    },
    smooth: true,
    tooltip: { showMarkers: false },
  };

  // Trạng thái đơn: Bar chart (cột ngang)
  const barColors: Record<string, string> = {
    "Chờ xác nhận": "#1890ff",
    "Đã duyệt": "#52c41a",
    "Hoàn tất": "#faad14",
    "Đã hủy": "#ff4d4f",
  };
  const barConfig = {
    data: orderStatusData || [],
    xField: "value",
    yField: "type",
    color: ({ type }: any) => barColors[type] || "#1890ff",
    legend: false,
    label: false,
    xAxis: {
      title: { text: "Số lượng", style: { fontWeight: 600, fontSize: 14 } },
    },
    yAxis: {
      title: { text: "Trạng thái", style: { fontWeight: 600, fontSize: 14 } },
    },
    barStyle: { radius: [4, 4, 4, 4] },
    height: 260,
    tooltip: { showMarkers: false },
    isStack: false,
    isGroup: false,
  };

  if (loading) {
    return (
      <div className={styles.dashboardPage}>
        <div className={styles.loadingContainer}>
          <Spin size="large" />
          <p>Đang tải dữ liệu thống kê...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardPage}>
        <Alert
          message="Lỗi tải dữ liệu"
          description={error}
          type="error"
          showIcon
          action={<a onClick={() => window.location.reload()}>Thử lại</a>}
        />
      </div>
    );
  }

  return (
    <div className={styles.dashboardPage} style={{ padding: 16 }}>
      <Row gutter={[16, 16]} align="stretch">
        <Col xs={24} lg={12} style={{ height: "100%" }}>
          <Card
            className={styles.dashboardCard}
            title="Thống kê nhanh"
            styles={{ body: { padding: 16 } }}
            style={{ height: "100%" }}
          >
            <div className={styles.quickStats}>
              <div className={styles.statItem}>
                <UserOutlined />
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {userStats.totalUsers || 0}
                  </div>
                  <div className={styles.statLabel}>Tổng người dùng</div>
                </div>
              </div>
              <div className={styles.statItem}>
                <UserSwitchOutlined />
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {userStats.bookedUsers || 0}
                  </div>
                  <div className={styles.statLabel}>Người dùng đã lái thử</div>
                </div>
              </div>
              <div className={styles.statItem}>
                <CarOutlined />
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {productStats.totalProducts || 0}
                  </div>
                  <div className={styles.statLabel}>Tổng sản phẩm</div>
                </div>
              </div>
              <div className={styles.statItem}>
                <ProfileOutlined />
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {orderStats.totalOrders || 0}
                  </div>
                  <div className={styles.statLabel}>Tổng đơn lái thử</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12} style={{ height: "100%" }}>
          <Card
            className={styles.dashboardCard}
            title="Đăng ký lái thử theo ngày"
            styles={{ body: { padding: 16 } }}
            style={{ height: "100%" }}
          >
            {areaConfig.data.length > 0 ? (
              <Area {...areaConfig} height={260} tooltip={false} />
            ) : (
              <div
                style={{
                  height: 260,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                  fontSize: 18,
                }}
              >
                Không có dữ liệu
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12} style={{ height: "100%" }}>
          <Card
            className={styles.dashboardCard}
            title="Top xe được lái thử nhiều nhất"
            styles={{ body: { padding: 16 } }}
            style={{ height: "100%" }}
          >
            {chartError ? (
              <Alert
                message="Lỗi hiển thị biểu đồ"
                description={chartError}
                type="error"
                showIcon
              />
            ) : columnConfig.data.length > 0 ? (
              (() => {
                try {
                  return (
                    <Column {...columnConfig} height={260} tooltip={false} />
                  );
                } catch (err: any) {
                  setChartError(
                    err?.message || "Lỗi không xác định khi hiển thị biểu đồ"
                  );
                  return (
                    <Alert
                      message="Lỗi hiển thị biểu đồ"
                      description={err?.message}
                      type="error"
                      showIcon
                    />
                  );
                }
              })()
            ) : (
              <div
                style={{
                  height: 260,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                  fontSize: 18,
                }}
              >
                Không có dữ liệu
              </div>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12} style={{ height: "100%" }}>
          <Card
            className={styles.dashboardCard}
            title="Phân bố trạng thái đơn lái thử"
            styles={{ body: { padding: 16 } }}
            style={{ height: "100%" }}
          >
            {barConfig.data.length > 0 ? (
              <Bar {...barConfig} />
            ) : (
              <div
                style={{
                  height: 260,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                  fontSize: 18,
                }}
              >
                Không có dữ liệu
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
