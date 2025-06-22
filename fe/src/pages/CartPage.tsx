import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { Spin, message, Typography, Table, Button, Space, InputNumber, Image as AntdImage, Form, Input, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatCurrency } from '../utils/format';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

export interface CartItem {
  _id: string;
  CartID: string;
  ProductID: {
    _id: string;
    Product_Name: string;
    Price: number;
    Main_Image: string;
  };
  quantity: number;
  Unit_Price: number;
  Total_Price: number;
  Image: string;
  priceAtOrder: number;
}

interface ShippingAddressData {
  FullName: string;
  Address: string;
  Phone: string;
  Email: string;
  PaymentMethod: string;
  Notes?: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const [submittingOrder, setSubmittingOrder] = useState(false);
  const [form] = Form.useForm<ShippingAddressData>();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setLoading(false);
        message.warning('Vui lòng đăng nhập để xem giỏ hàng.');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/gio-hang/`);
        if (response.data && response.data.data && response.data.data.items) {
          setCartItems(response.data.data.items.map((item: CartItem) => ({
            ...item,
            key: item._id
          })));
        } else {
          setCartItems([]);
          console.error('Unexpected cart data format or no items:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        message.error('Không thể tải giỏ hàng.');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const itemToRemove = cartItems.find(item => item._id === itemId);
      if(itemToRemove) {
        handleRemoveItem(itemToRemove._id);
      }
      return;
    }
    if (!userId || !itemId) {
      console.warn('Không thể cập nhật số lượng: userId hoặc itemId bị thiếu', { userId, itemId });
      return;
    }

    setUpdatingItemId(itemId);
    try {
      const response = await axios.put(`${API_BASE_URL}/gio-hang/items/${itemId}`, { quantity: newQuantity });
      console.log(response.data);
      if (response.data && response.data.data && response.data.data.items) {
        setCartItems(response.data.data.items.map((item: CartItem) => ({
          ...item,
          key: item._id
        })));
      } else {
        console.error('Unexpected response format after updating quantity or no items:', response.data);
      }

      message.success('Cập nhật số lượng thành công!');
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      const errorMessage = (error as any).response?.data?.message || 'Không thể cập nhật số lượng sản phẩm.';
      message.error(errorMessage);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!userId || !itemId) {
      console.warn('Không thể xóa sản phẩm: userId hoặc itemId bị thiếu', { userId, itemId });
      return;
    }

    setUpdatingItemId(itemId);
    try {
      await axios.delete(`${API_BASE_URL}/gio-hang/${userId}/muc/${itemId}`);
      setCartItems(prevItems => prevItems.filter(item => item._id !== itemId));
      message.success('Đã xóa sản phẩm khỏi giỏ hàng!');
    } catch (error) {
      console.error('Error removing cart item:', error);
      if ((error as any).response) {
        console.error('Error response data:', (error as any).response.data);
        console.error('Error response status:', (error as any).response.status);
        console.error('Error response headers:', (error as any).response.headers);
      }
      message.error('Không thể xóa sản phẩm khỏi giỏ hàng.');
    } finally {
      setUpdatingItemId(null);
    }
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.priceAtOrder * item.quantity),
    0
  );

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'ProductID',
      key: 'product',
      render: (product: CartItem['ProductID'], record: CartItem) => (
        <Space key={record._id}>
          <AntdImage src={product.Main_Image} alt={product.Product_Name} width={50} />
          <Link to={`/san-pham/${product._id}`}>{product.Product_Name}</Link>
        </Space>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'priceAtOrder',
      key: 'price',
      render: (price: number) => formatCurrency(price),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: CartItem) => (
        <InputNumber
          key={record._id}
          min={1}
          value={quantity}
          onChange={(value) => handleUpdateQuantity(record._id, value || 1)}
          disabled={updatingItemId === record._id}
        />
      ),
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'Total_Price',
      key: 'total',
      render: (_: any, record: CartItem) => formatCurrency(record.priceAtOrder * record.quantity),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: CartItem) => (
        <Button
          key={record._id}
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemoveItem(record._id)}
          loading={updatingItemId === record._id}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const onFinishOrder = async (values: ShippingAddressData) => {
    if (!userId) {
      message.warning('Vui lòng đăng nhập để đặt hàng.');
      return;
    }

    if (cartItems.length === 0) {
      message.warning('Giỏ hàng trống, không thể đặt hàng.');
      return;
    }

    setSubmittingOrder(true);
    try {
      const orderData = {
        UserID: userId,
        items: cartItems.map(item => ({
          ProductID: item.ProductID._id,
          quantity: item.quantity,
          priceAtOrder: item.Unit_Price
        })),
        Total_Amount: totalAmount,
        Status: 'pending',
        Order_Date: new Date().toISOString(),
        ShippingAddress: {
          FullName: values.FullName,
          Address: values.Address,
          Phone: values.Phone,
          Email: values.Email,
          PaymentMethod: values.PaymentMethod || 'cashOnDelivery',
          Notes: values.Notes || '',
        },
      };

      const response = await axios.post(`${API_BASE_URL}/don-hang`, orderData);

      if (response.data.success) {
        message.success('Đặt hàng thành công!');
        try {
          await axios.delete(`${API_BASE_URL}/gio-hang/${userId}`);
          setCartItems([]);
        } catch (deleteError) {
          console.error('Error clearing cart after order:', deleteError);
        }
        navigate('/san-pham');
      } else {
        message.error(response.data.message || 'Đã xảy ra lỗi khi đặt hàng.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      message.error('Đã xảy ra lỗi khi đặt hàng.');
    } finally {
      setSubmittingOrder(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" spinning={loading} />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page__container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>Giỏ hàng của bạn</Title>

        <Spin spinning={submittingOrder} delay={300}>
          <div style={{ display: 'grid', gridTemplateColumns: cartItems.length > 0 ? '2fr 1fr' : '1fr', gap: '20px' }}>
            <div className="cart-page__items">
              <Table
                columns={columns}
                dataSource={cartItems}
                rowKey="_id"
                pagination={false}
                locale={{ emptyText: 'Giỏ hàng của bạn đang trống.' }}
              />
            </div>

            {cartItems.length > 0 && (
              <div className="cart-page__checkout-form">
                <Card title="Thông tin nhận hàng">
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinishOrder}
                    initialValues={{ PaymentMethod: 'cashOnDelivery' }}
                  >
                    <Form.Item
                      name="FullName"
                      label="Họ và tên"
                      rules={[{ required: true, message: 'Vui lòng nhập Họ và tên!' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="Phone"
                      label="Số điện thoại"
                      rules={[
                        { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="Email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Vui lòng nhập Email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="Address"
                      label="Địa chỉ"
                      rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ!' }]}
                    >
                      <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                      name="PaymentMethod"
                      label="Phương thức thanh toán"
                      rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                    >
                      <Input disabled value="Thanh toán khi nhận hàng" />
                    </Form.Item>

                    <Form.Item
                      name="Notes"
                      label="Ghi chú (Tùy chọn)"
                    >
                      <TextArea rows={2} />
                    </Form.Item>

                    <Form.Item>
                      <Button 
                        type="primary" 
                        htmlType="submit"
                        size="large" 
                        loading={submittingOrder} 
                        disabled={submittingOrder}
                        style={{ width: '100%' }}
                      >
                        Tiến hành đặt hàng
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </div>
            )}
          </div>
        </Spin>

        {!loading && cartItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Title level={3}>Giỏ hàng trống</Title>
            <Paragraph>Không có sản phẩm nào trong giỏ hàng.</Paragraph>
            <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage; 