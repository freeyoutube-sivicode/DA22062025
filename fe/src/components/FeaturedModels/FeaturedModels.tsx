import React, { useEffect, useState } from "react";
import { Card, Button, Spin, message, Tag } from "antd";
import { RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE_URL } from "../../api/config";
import { Product } from "../../api/types";
import { formatCurrency } from "../../utils/format";
import { useNavigate } from "react-router-dom";

const FeaturedModels: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/san-pham`);
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products.slice(0, 3));
        } else {
          setProducts([]);
          message.error("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Không thể tải danh sách sản phẩm.");
        message.error("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetail = (productId: string) => {
    navigate(`/san-pham/${productId}`);
  };

  const handleTestDrive = () => {
    navigate("/dich-vu");
  };

  if (loading) {
    return (
      <section
        style={{
          padding: "4rem 2rem",
          backgroundColor: "#ffffff",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "2rem",
              color: "#333",
            }}
          >
            MẪU XE NỔI BẬT
          </h2>
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Spin size="large" tip="Đang tải sản phẩm..." />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        style={{
          padding: "4rem 2rem",
          backgroundColor: "#ffffff",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "2rem",
              color: "#333",
            }}
          >
            MẪU XE NỔI BẬT
          </h2>
          <div style={{ textAlign: "center", padding: "50px 0", color: "red" }}>
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section
        style={{
          padding: "4rem 2rem",
          backgroundColor: "#ffffff",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "2rem",
              color: "#333",
            }}
          >
            MẪU XE NỔI BẬT
          </h2>
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            Không tìm thấy sản phẩm nào nổi bật.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: "4rem 2rem",
        backgroundColor: "#ffffff",
        minHeight: "400px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "2rem",
            color: "#333",
          }}
        >
          MẪU XE NỔI BẬT
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            padding: "1rem",
          }}
        >
          {products.map((model) => (
            <Card
              key={model._id}
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  hoveredCard === model._id
                    ? "0 8px 25px rgba(0, 0, 0, 0.15)"
                    : "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                border: "1px solid #e0e0e0",
                transform:
                  hoveredCard === model._id
                    ? "translateY(-5px)"
                    : "translateY(0)",
                cursor: "pointer",
              }}
              hoverable={false}
              onMouseEnter={() => setHoveredCard(model._id)}
              onMouseLeave={() => setHoveredCard(null)}
              cover={
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt={model.Product_Name}
                    src={model.Main_Image || "/images/placeholder.jpg"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      transform:
                        hoveredCard === model._id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
              }
            >
              <div style={{ padding: "1rem" }}>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: hoveredCard === model._id ? "#0284c7" : "#333",
                    transition: "color 0.3s ease",
                  }}
                >
                  {model.Product_Name}
                </h3>
                {model.Specifications &&
                  Object.keys(model.Specifications).length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {Object.entries(model.Specifications)
                        .slice(0, 3)
                        .map(([key, value]) => (
                          <Tag
                            key={key}
                            style={{
                              backgroundColor: "#f0f0f0",
                              color: "#666",
                              border: "none",
                              borderRadius: "4px",
                            }}
                          >
                            {`${key}: ${value}`}
                          </Tag>
                        ))}
                    </div>
                  )}
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "#0284c7",
                    marginBottom: "1rem",
                  }}
                >
                  {formatCurrency(model.Price)}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    type="primary"
                    style={{
                      flex: 1,
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      transform:
                        hoveredCard === model._id ? "scale(1.02)" : "scale(1)",
                    }}
                    onClick={() => handleViewDetail(model._id)}
                  >
                    Xem chi tiết
                  </Button>
                  <Button
                    style={{
                      flex: 1,
                      borderRadius: "8px",
                      border: "1px solid #0284c7",
                      color: "#0284c7",
                      transition: "all 0.3s ease",
                      transform:
                        hoveredCard === model._id ? "scale(1.02)" : "scale(1)",
                    }}
                    onClick={handleTestDrive}
                  >
                    Đặt lịch lái thử
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;
