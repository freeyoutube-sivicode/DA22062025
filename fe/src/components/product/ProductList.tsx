import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>Có lỗi xảy ra khi tải danh sách sản phẩm</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        <p>Không tìm thấy sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList; 