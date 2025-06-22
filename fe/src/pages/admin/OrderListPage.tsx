import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, message, Select } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

interface ShippingAddress {
  FullName: string;
  Address: string;
  Phone: string;
  Email?: string;
}

interface Order {
  _id: string;
  UserID: string;
  items: any[];
  Order_Date: string;
  Total_Amount: number;
  Status: string;
  PaymentMethod: string;
  ShippingAddress: ShippingAddress;
  Notes?: string;
  createdAt: string;
  updatedAt: string;
}

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchOrders = async (page: number = pagination.current, limit: number = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/don-hang?page=${page}&limit=${limit}`);
      setOrders(response.data.data.orders);
      setPagination({
        ...pagination,
        current: response.data.data.pagination.page,
        pageSize: response.data.data.pagination.limit,
        total: response.data.data.pagination.total,
      });
    } catch (error) {
      message.error('Lỗi khi tải danh sách đơn hàng');
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchOrders(pagination.current, pagination.pageSize);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(`/api/don-hang/${orderId}/status`, { status: newStatus });
      message.success('Cập nhật trạng thái đơn hàng thành công');
      fetchOrders();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái đơn hàng');
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      pending: 'gold',
      processing: 'blue',
      shipped: 'cyan',
      delivered: 'green',
      cancelled: 'red',
    };
    return statusColors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const statusTexts: { [key: string]: string } = {
      pending: 'Chờ xử lý',
      processing: 'Đang xử lý',
      shipped: 'Đang giao hàng',
      delivered: 'Đã giao hàng',
      cancelled: 'Đã hủy',
    };
    return statusTexts[status] || status;
  };

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => id.slice(-8).toUpperCase(),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'Order_Date',
      key: 'Order_Date',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'Total_Amount',
      key: 'Total_Amount',
      render: (amount: number) => `${amount.toLocaleString('vi-VN')} VNĐ`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'Status',
      render: (status: string, record: Order) => (
        <Space>
          <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
          <Select
            value={status}
            onChange={(value) => handleStatusChange(record._id, value)}
            style={{ width: 150 }}
          >
            <Option value="pending">Chờ xử lý</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="shipped">Đang giao hàng</Option>
            <Option value="delivered">Đã giao hàng</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </Space>
      ),
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'PaymentMethod',
      key: 'PaymentMethod',
    },
    {
      title: 'Địa chỉ giao hàng',
      key: 'ShippingAddress.Address',
      render: (_: any, record: Order) => record.ShippingAddress?.Address || 'N/A',
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/admin/orders/${record._id}`)}
          >
            Chi tiết
          </Button>
          {record.Status === 'pending' && (
            <Space>
              <Button
                type="primary"
                onClick={() => handleStatusChange(record._id, 'processing')}
              >
                Xác nhận
              </Button>
              <Button
                danger
                onClick={() => handleStatusChange(record._id, 'cancelled')}
              >
                Hủy
              </Button>
            </Space>
          )}
          {record.Status === 'processing' && (
            <Button
              type="primary"
              onClick={() => handleStatusChange(record._id, 'shipped')}
            >
              Giao hàng
            </Button>
          )}
          {record.Status === 'shipped' && (
            <Button
              type="primary"
              onClick={() => handleStatusChange(record._id, 'delivered')}
            >
              Hoàn thành
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} đơn hàng`,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default OrderListPage; 