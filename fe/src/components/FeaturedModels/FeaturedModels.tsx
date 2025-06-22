import React, { useEffect, useState } from 'react';
import { Card, Button, Spin, message, Tag } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styles from './FeaturedModels.module.scss';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';
import { Product } from '../../api/types'; // Import Product type
import { formatCurrency } from '../../utils/format'; // Assuming you have this utility
import { useNavigate } from 'react-router-dom';

const FeaturedModels: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          message.error('Unexpected API response format');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải danh sách sản phẩm.');
        message.error('Không thể tải danh sách sản phẩm.');
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
    navigate('/dich-vu'); // Assuming 'dich-vu' page has the test drive registration form
  };

  if (loading) {
    return (
      <section className={styles.featuredModels}>
        <div className={styles.container}>
          <h2 className={styles.title}>MẪU XE NỔI BẬT</h2>
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <Spin size="large" tip="Đang tải sản phẩm..." />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.featuredModels}>
        <div className={styles.container}>
          <h2 className={styles.title}>MẪU XE NỔI BẬT</h2>
          <div style={{ textAlign: 'center', padding: '50px 0', color: 'red' }}>
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={styles.featuredModels}>
        <div className={styles.container}>
          <h2 className={styles.title}>MẪU XE NỔI BẬT</h2>
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            Không tìm thấy sản phẩm nào nổi bật.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.featuredModels}>
      <div className={styles.container}>
        <h2 className={styles.title}>MẪU XE NỔI BẬT</h2>
        <div className={styles.grid}>
          {products.map((model) => (
            <Card
              key={model._id}
              className={styles.modelCard}
              hoverable
              cover={
                <div className={styles.imageContainer}>
                  <img alt={model.Product_Name} src={model.Main_Image || '/images/placeholder.jpg'} />
                </div>
              }
            >
              <div className={styles.modelInfo}>
                <h3 className={styles.modelName}>{model.Product_Name}</h3>
                {model.Specifications && Object.keys(model.Specifications).length > 0 && (
                   <div className={styles.features}>
                     {Object.entries(model.Specifications).map(([key, value]) => (
                        <Tag key={key} className={styles.featureTag}>{`${key}: ${value}`}</Tag>
                     ))}
                   </div>
                )}
                <div className={styles.price}>{formatCurrency(model.Price)}</div>
                <div className={styles.actions}>
                  <Button type="primary" className={styles.detailButton} onClick={() => handleViewDetail(model._id)}>
                    Xem chi tiết
                  </Button>
                  <Button className={styles.testDriveButton} onClick={handleTestDrive}>
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