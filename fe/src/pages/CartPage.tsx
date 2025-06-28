import React, { useEffect, useState } from "react";
import {
  Spin,
  message,
  Typography,
  Table,
  Button,
  Space,
  Image as AntdImage,
  Card,
} from "antd";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import { formatCurrency } from "../utils/format";
import { Link, useNavigate } from "react-router-dom";
import { favoritesService } from "../api/services/favorites";
import { useAuth } from "../contexts/AuthContext";
import { FavoriteItem } from "../api/types";

const { Title, Paragraph } = Typography;

const CartPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        message.warning("Vui lòng đăng nhập để xem danh sách yêu thích.");
        return;
      }

      setLoading(true);
      try {
        const response = await favoritesService.getFavorites();

        if (response.success && response.data && response.data.items) {
          setFavorites(response.data.items);
        } else {
          setFavorites([]);
          console.error("Unexpected favorites data format:", response);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        message.error("Không thể tải danh sách yêu thích.");
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (itemId: string) => {
    if (!user || !itemId) {
      console.warn("Không thể xóa sản phẩm: user hoặc itemId bị thiếu", {
        user,
        itemId,
      });
      return;
    }

    setRemovingItemId(itemId);
    try {
      await favoritesService.removeFromFavorites(itemId);
      setFavorites((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
      message.success("Đã xóa sản phẩm khỏi danh sách yêu thích!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      message.error("Không thể xóa sản phẩm khỏi danh sách yêu thích.");
    } finally {
      setRemovingItemId(null);
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "ProductID",
      key: "product",
      render: (product: FavoriteItem["ProductID"], record: FavoriteItem) => (
        <Space key={record._id}>
          <AntdImage
            src={product.Main_Image || record.Image}
            alt={product.Product_Name}
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: "8px" }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
          />
          <div>
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              {product.Product_Name}
            </div>
            <div style={{ color: "#666", fontSize: "14px" }}>
              {formatCurrency(product.Price)}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: any, record: FavoriteItem) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/san-pham/${record.ProductID._id}`)}
          >
            Xem chi tiết
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleRemoveFavorite(record._id)}
            loading={removingItemId === record._id}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" spinning={loading} />
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div
        className="favorites-page__container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <HeartOutlined
            style={{ fontSize: "24px", color: "#ff4757", marginRight: "12px" }}
          />
          <Title level={2} style={{ margin: 0 }}>
            Danh sách yêu thích
          </Title>
        </div>

        <div className="favorites-page__items">
          <Table
            columns={columns}
            dataSource={favorites}
            rowKey="_id"
            pagination={false}
            locale={{ emptyText: "Danh sách yêu thích của bạn đang trống." }}
          />
        </div>

        {!loading && favorites.length === 0 && (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Title level={3}>Danh sách yêu thích trống</Title>
            <Paragraph>
              Không có sản phẩm nào trong danh sách yêu thích.
            </Paragraph>
            <Link
              to="/san-pham"
              style={{ marginTop: "20px", display: "inline-block" }}
            >
              Khám phá sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
