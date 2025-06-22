import React from 'react';
import { useDispatch } from 'react-redux';
import { CartItem as CartItemType } from '../../api/types';
import { updateCartItem, removeFromCart } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/format';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateCartItem({ id: item._id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
  };

  return (
    <div className="flex items-center py-4 border-b">
      <img
        src={item.Product.Main_Image}
        alt={item.Product.Product_Name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-medium text-gray-900">{item.Product.Product_Name}</h3>
        <p className="text-gray-500">{formatCurrency(item.Product.Price)}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => handleQuantityChange(item.Quantity - 1)}
            className="text-gray-500 hover:text-gray-700"
          >
            -
          </button>
          <span className="mx-2 w-8 text-center">{item.Quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.Quantity + 1)}
            className="text-gray-500 hover:text-gray-700"
          >
            +
          </button>
        </div>
      </div>
      <div className="ml-4">
        <p className="text-lg font-medium text-gray-900">
          {formatCurrency(item.Product.Price * item.Quantity)}
        </p>
        <button
          onClick={handleRemove}
          className="mt-2 text-red-600 hover:text-red-800"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem; 