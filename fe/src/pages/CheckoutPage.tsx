import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { Spin, message, Typography, Form, Input, Button, Card, Divider, List, Image as AntdImage } from 'antd';
import { formatCurrency } from '../utils/format';
import { CartItem } from './CartPage';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface ShippingAddressData {
  FullName: string;
  Address: string;
  Phone: string;
  Email: string;
  PaymentMethod: string;
  Notes?: string;
}

const CheckoutPage: React.FC = () => {
  const [form] = Form.useForm<ShippingAddressData>();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const userId = localStorage.getItem('userId');
  console.log(userId); 

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setLoadingCart(false);
        message.warning('Vui lòng đăng nhập để tiến hành đặt hàng.');
        navigate('/login');
        return;
      }

      setLoadingCart(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/gio-hang/${userId}`);
        
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          setCartItems(response.data.data.data);
        } else {
          setCartItems([]);
          console.error('Unexpected or empty cart data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching cart for checkout:', error);
        message.error('Không thể tải thông tin giỏ hàng.');
        setCartItems([]);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, [userId, navigate]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.ProductID.Price * item.quantity,
    0
  );

  const onFinish = async (values: ShippingAddressData) => {
    if (!userId) {
      message.warning('Bạn chưa đăng nhập.');
      return;
    }

    if (cartItems.length === 0) {
      message.warning('Giỏ hàng trống, không thể đặt hàng.');
      navigate('/gio-hang');
      return;
    }

    setSubmittingOrder(true);
    try {
      const orderData = {
        UserID: userId,
        items: cartItems.map(item => ({
          ProductID: item.ProductID._id,
          quantity: item.quantity,
          priceAtOrder: item.ProductID.Price
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
        navigate('/don-hang');
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

  if (loadingCart) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="Đang tải thông tin giỏ hàng..." spinning={loadingCart}/>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Title level={3}>Giỏ hàng trống</Title>
        <Paragraph>Không có sản phẩm nào trong giỏ hàng để tiến hành đặt hàng.</Paragraph>
        <Link to="/" style={{ marginTop: '20px', display: 'inline-block' }}>
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div className="checkout-page__container">
        <Title level={2}>Xác nhận đặt hàng</Title>

        <Spin spinning={submittingOrder} delay={300}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="checkout-page__shipping-form">
              <Card title="Thông tin nhận hàng">
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
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
                      Xác nhận đặt hàng
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>

            <div className="checkout-page__order-summary">
              <Card title="Đơn hàng của bạn">
                <List
                  itemLayout="horizontal"
                  dataSource={cartItems}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<AntdImage src={item.ProductID.Main_Image} width={50} preview={false} />}
                        title={<Link to={`/san-pham/${item.ProductID._id}`}>{item.ProductID.Product_Name}</Link>}
                        description={
                          <Paragraph>
                            Giá: {formatCurrency(item.ProductID.Price)} x {item.quantity}
                            <br />
                            Tổng: {formatCurrency(item.ProductID.Price * item.quantity)}
                          </Paragraph>
                        }
                      />
                    </List.Item>
                  )}
                />
                <Divider />
                <Title level={4} style={{ textAlign: 'right' }}>
                  Tổng tiền: {formatCurrency(totalAmount)}
                </Title>
              </Card>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default CheckoutPage; 