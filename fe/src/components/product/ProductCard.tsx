import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../api/types';
import { formatCurrency } from '../../utils/format';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/san-pham/${product._id}`);
  };

  const handleRegisterTestDrive = () => {
    navigate('/dat-hen-lai-thu');
  };

  const unavailable = product.Status === 'unavailable';

  return (
    <div className="product-card">
      <div className="product-card__image">
        <Link to={`/san-pham/${product._id}`}>
          <img
            src={product.Main_Image}
            alt={product.Product_Name}
          />
          {unavailable && (
            <div className="product-card__tags">
              <span className="product-card__tag product-card__tag--unavailable">Hết hàng</span>
            </div>
          )}
        </Link>
      </div>

      <div className="product-card__info">
        <Link to={`/san-pham/${product._id}`} className="product-card__title">
          {product.Product_Name}
        </Link>

        <div className="product-card__specs">
          <span className="product-card__spec">
            <i className="fas fa-tachometer-alt"></i> 300 HP
          </span>
          <span className="product-card__spec">
            <i className="fas fa-gas-pump"></i> Xăng
          </span>
          <span className="product-card__spec">
            <i className="fas fa-cog"></i> Tự động
          </span>
        </div>

        <div className="product-card__price">
          {formatCurrency(product.Price)}
        </div>

        <div className="product-card__actions">
          <Link to={`/san-pham/${product._id}`} className="product-card__btn-detail" onClick={handleViewDetail}>
            Xem chi tiết
          </Link>
          <button className="product-card__btn-add-to-cart" onClick={handleRegisterTestDrive} disabled={unavailable}>
            Đăng Ký Lái Thử
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 