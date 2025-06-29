import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../api/config";
import { Product } from "../api/types"; // Import Product type
import {
  Typography,
  Spin,
  Image as AntdImage,
  Descriptions,
  Space,
  Button,
  notification,
  Card,
  Row,
  Col,
  Table,
  Tooltip,
} from "antd";
import { formatCurrency } from "../utils/format";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PageBanner from "../components/PageBanner";
import "./ProductDetailPage.scss";

const { Title, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/xe/${id}`);
        // Backend returns data directly, not nested in data.data
        setProduct(response.data.data || response.data);
      } catch (error: any) {
        console.error("Error fetching product detail:", error);

        // Handle specific error cases
        if (error.response?.status === 404) {
          notification.error({
            message: "Không tìm thấy xe",
            description: "Xe bạn đang tìm kiếm không tồn tại trong hệ thống.",
          });
        } else if (error.response?.status === 500) {
          notification.error({
            message: "Lỗi server",
            description: "Có lỗi xảy ra từ phía server. Vui lòng thử lại sau.",
          });
        } else {
          notification.error({
            message: "Lỗi kết nối",
            description:
              "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.",
          });
        }

        setProduct(null);
        setError(error.response?.data?.message || "Không thể tải chi tiết xe.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // Refetch when ID changes

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product) return;

      setRelatedLoading(true);
      try {
        const categoryId =
          typeof product.CategoryID === "string"
            ? product.CategoryID
            : (product.CategoryID as any)?._id;

        const response = await axios.get(`${API_BASE_URL}/xe`, {
          params: {
            limit: 4,
            exclude: id,
            category: categoryId,
          },
        });
        setRelatedProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [product, id]);

  const handleRegisterConsultation = () => {
    navigate("/dich-vu"); // Navigate to the services page
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" tip="Đang tải xe..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={3}>Không tìm thấy xe</Title>
        <Paragraph>
          {error ||
            "Xe bạn đang tìm kiếm có thể không tồn tại hoặc đã bị gỡ bỏ."}
        </Paragraph>
        <Button
          type="primary"
          onClick={() => navigate("/xe")}
          style={{ marginTop: 16 }}
        >
          Quay lại danh sách xe
        </Button>
      </div>
    );
  }

  // Combine main image and list images without formatting or filtering
  const allImages = product.List_Image
    ? [product.Main_Image, ...product.List_Image]
    : [product.Main_Image];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="product-detail__container">
      <PageBanner
        title="Chi tiết xe"
        subtitle="Khám phá thông tin chi tiết về xe bạn quan tâm"
      />

      <Card className="product-detail__card">
        <div className="product-detail__grid">
          {/* Image Gallery */}
          <div className="product-detail__gallery">
            <div className="product-detail__gallery-main">
              <AntdImage
                src={allImages[currentImageIndex]} // Use the raw URL from the combined list
                alt={product.Product_Name}
                className="product-detail__gallery-image"
                preview={true}
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="product-detail__gallery-nav product-detail__gallery-nav--prev"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="product-detail__gallery-nav product-detail__gallery-nav--next"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="product-detail__gallery-thumbnails">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`product-detail__gallery-thumbnails-item ${currentImageIndex === index ? "product-detail__gallery-thumbnails-item--active" : ""}`}
                  >
                    <img
                      src={image} // Use the raw URL from the list
                      alt={`${product.Product_Name} - ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-detail__info">
            <div className="product-detail__info-header">
              <Title level={2} className="product-detail__info-title">
                {product.Product_Name}
              </Title>
              <div className="product-detail__info-price-container">
                <Typography.Text strong className="product-detail__info-price">
                  {formatCurrency(product.Price)}
                </Typography.Text>
              </div>
            </div>

            <div className="product-detail__info-section">
              <Title level={4} className="product-detail__info-section-title">
                Thông số kỹ thuật
              </Title>
              {product.Specifications &&
              Object.keys(product.Specifications).length > 0 ? (
                <div className="product-detail__specifications">
                  <Table
                    dataSource={Object.entries(product.Specifications).map(
                      ([key, value], index) => ({
                        key: index,
                        spec: key,
                        value: String(value),
                      })
                    )}
                    columns={[
                      {
                        title: "Thông số",
                        dataIndex: "spec",
                        key: "spec",
                        width: "40%",
                        render: (text) => (
                          <div className="product-detail__spec-label">
                            {text}
                          </div>
                        ),
                      },
                      {
                        title: "Giá trị",
                        dataIndex: "value",
                        key: "value",
                        width: "60%",
                        render: (text) => (
                          <div className="product-detail__spec-value">
                            {text}
                          </div>
                        ),
                      },
                    ]}
                    pagination={false}
                    size="small"
                    className="product-detail__spec-table"
                  />
                </div>
              ) : (
                <div className="product-detail__info-section-content">
                  <Paragraph>Đang cập nhật...</Paragraph>
                </div>
              )}
            </div>

            <div className="product-detail__info-actions">
              <div className="product-detail__info-buttons">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleRegisterConsultation}
                  block
                  className="product-detail__consultation-btn"
                >
                  Đăng ký tư vấn
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Description Row */}
        <div className="product-detail__description-row">
          <div className="product-detail__description-section">
            <Title level={4} className="product-detail__description-title">
              Mô tả
            </Title>
            <div className="product-detail__description-content">
              <Paragraph>{product.Description || "Đang cập nhật..."}</Paragraph>
            </div>
          </div>
        </div>
      </Card>

      {/* Related Products Section */}
      <div className="product-detail__related">
        <Title level={3} className="product-detail__related-main-title">
          Xe liên quan
        </Title>
        <Spin spinning={relatedLoading}>
          {relatedProducts.length > 0 ? (
            <Row gutter={[20, 20]}>
              {relatedProducts.map((relatedProduct) => (
                <Col xs={24} sm={12} md={6} key={relatedProduct._id}>
                  <Card
                    hoverable
                    className="product-detail__related-card"
                    cover={
                      <div className="product-detail__related-image">
                        <img
                          alt={relatedProduct.Product_Name}
                          src={relatedProduct.Main_Image}
                          onClick={() => navigate(`/xe/${relatedProduct._id}`)}
                        />
                      </div>
                    }
                    onClick={() => navigate(`/xe/${relatedProduct._id}`)}
                  >
                    <Card.Meta
                      title={
                        <Tooltip
                          title={
                            relatedProduct.Product_Name.length > 20
                              ? relatedProduct.Product_Name
                              : null
                          }
                          placement="top"
                          mouseEnterDelay={0.5}
                        >
                          <div className="product-detail__related-title">
                            {relatedProduct.Product_Name}
                          </div>
                        </Tooltip>
                      }
                      description={
                        <div className="product-detail__related-price">
                          {formatCurrency(relatedProduct.Price)}
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="product-detail__related-empty">
              <Paragraph>Không có xe liên quan</Paragraph>
            </div>
          )}
        </Spin>
      </div>
    </div>
  );
};

export default ProductDetailPage;
