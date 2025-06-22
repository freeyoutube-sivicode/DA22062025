import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../api/types';
import { formatCurrency } from '../../utils/format';

interface CartSummaryProps {
  items: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const subtotal = items.reduce(
    (total, item) => total + item.Product.Price * item.Quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Tổng quan đơn hàng</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính</span>
          <span className="text-gray-900 font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Tổng cộng</span>
            <span className="text-lg font-semibold text-primary-600">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="block w-full bg-primary-600 text-white text-center py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
        >
          Tiến hành đặt lịch
        </Link>
        <Link
          to="/"
          className="block w-full text-center text-gray-600 hover:text-primary-600"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default CartSummary; 