import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { Product } from '../api/types'; // Import Product type
import { Typography, Spin, Image as AntdImage, Descriptions, Space, Button, notification, Card, message } from 'antd';
import { formatCurrency } from '../utils/format';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProductDetailPage.scss';
import { useDispatch } from 'react-redux';
import { fetchCart } from '../store/slices/cartSlice';
import { AppDispatch } from '../store';

const { Title, Paragraph } = Typography;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false); // State for add to cart loading

  // Get dispatch function with AppDispatch type
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/san-pham/${id}`);
        // Assuming API response structure is { data: { ...productData } }
        setProduct(response.data.data); // Access nested data if needed, adjust based on actual API response
      } catch (error) {
        console.error('Error fetching product detail:', error);
        message.error('Không thể tải chi tiết sản phẩm.');
        setProduct(null); // Set product to null on error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]); // Refetch when ID changes

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        notification.warning({
          message: 'Vui lòng đăng nhập',
          description: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng',
        });
        return;
      }

      setAddingToCart(true);
      await axios.post(`${API_BASE_URL}/gio-hang/items`, {
        productId: product?._id,
        quantity: 1,
      });

      notification.success({
        message: 'Thành công',
        description: 'Đã thêm sản phẩm vào giỏ hàng',
      });

      dispatch(fetchCart());

    } catch (error) {
      console.error('Error adding to cart:', error);
      // Hiển thị thông báo lỗi từ backend nếu có
      const errorMessage = (error as any).response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng';
      notification.error({
        message: 'Lỗi',
        description: errorMessage,
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const handleRegisterConsultation = () => {
    navigate('/dich-vu'); // Navigate to the services page
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="Đang tải sản phẩm..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={3}>Không tìm thấy sản phẩm</Title>
        <Paragraph>Sản phẩm bạn đang tìm kiếm có thể không tồn tại hoặc đã bị gỡ bỏ.</Paragraph>
      </div>
    );
  }

  // Combine main image and list images without formatting or filtering
  const allImages = product.List_Image ? [product.Main_Image, ...product.List_Image] : [product.Main_Image];

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
                    className={`product-detail__gallery-thumbnails-item ${currentImageIndex === index ? 'product-detail__gallery-thumbnails-item--active' : ''}`}
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
            <Title level={2} className="product-detail__info-title">{product.Product_Name}</Title>
            <Typography.Text strong className="product-detail__info-price">{formatCurrency(product.Price)}</Typography.Text>

            <div className="product-detail__info-section">
              <Title level={4} className="product-detail__info-section-title">Mô tả</Title>
              <Paragraph>{product.Description || 'Đang cập nhật...'}</Paragraph>
            </div>

            <div className="product-detail__info-section">
              <Title level={4} className="product-detail__info-section-title">Thông số kỹ thuật</Title>
              {product.Specifications && Object.keys(product.Specifications).length > 0 ? (
                <Descriptions bordered size="small" column={{
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 4,
                  xxl: 4,
                }}>
                  {Object.entries(product.Specifications).map(([key, value]) => (
                    <Descriptions.Item key={key} label={key}>{String(value)}</Descriptions.Item>
                  ))}
                </Descriptions>
              ) : (
                <Paragraph>Đang cập nhật...</Paragraph>
              )}
            </div>

            <div className="product-detail__info-buttons">
              <Button
                type="primary"
                size="large"
                onClick={handleAddToCart}
                loading={addingToCart}
                block
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleRegisterConsultation}
                block
              >
                Đăng ký tư vấn
              </Button>
            </div>
            {product.Stock !== undefined && (
              <Typography.Text type="secondary" className="product-detail__info-stock">
                Còn {product.Stock} sản phẩm
              </Typography.Text>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailPage; 