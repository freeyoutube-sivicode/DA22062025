import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Modal, Form, Input, Select, Tag, Typography, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
// Assuming you have a type definition for OrderTestDrive
interface UserInfo {
  _id: string;
  UserName: string;
  Email: string;
  Phone: string;
}

interface OrderTestDrive {
  _id: string;
  UserID: UserInfo; // Populated user info
  CartID: string; // Assuming CartID is a string, adjust if populated
  Order_Date: string; // Date of order creation
  Test_Drive_Date: string; // Requested test drive date
  Address: string;
  Status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  Notes?: string;
  Total_Amount: number; // Not directly relevant for test drive, but included based on type
  ImageUrl?: string; // Not directly relevant for test drive, but included based on type
  createdAt: string;
  updatedAt: string;
}

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

const TestDriveBookingListPage: React.FC = () => {
  const [bookings, setBookings] = useState<OrderTestDrive[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);

  const fetchBookings = async (page: number = pagination.current, limit: number = pagination.pageSize, search: string = searchTerm, status: string | undefined = selectedStatus, dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null = dateRange) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/lich-lai-thu', {
        params: {
          page,
          limit,
          search,
          status,
          startDate: dates?.[0]?.toISOString(),
          endDate: dates?.[1]?.toISOString(),
        },
      });
      setBookings(response.data.orders);
      setPagination({
        ...pagination,
        current: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        total: response.data.pagination.total,
      });
    } catch (error) {
      message.error('Lỗi khi tải danh sách đăng ký lái thử');
      console.error('Error fetching test drive bookings:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [pagination.current, pagination.pageSize, searchTerm, selectedStatus, dateRange]); // Add dependencies

  const handleTableChange = (pagination: any) => {
    fetchBookings(pagination.current, pagination.pageSize);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination({ ...pagination, current: 1 }); // Reset to first page on search
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value === '' ? undefined : value);
    setPagination({ ...pagination, current: 1 }); // Reset to first page on status change
  };

  const handleDateRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    setDateRange(dates);
    setPagination({ ...pagination, current: 1 }); // Reset to first page on date change
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    try {
      await axios.put(`/api/lich-lai-thu/${bookingId}`, { Status: newStatus });
      message.success('Cập nhật trạng thái đăng ký thành công');
      fetchBookings();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái đăng ký');
      console.error('Error updating booking status:', error);
    }
  };

  const handleDelete = async (bookingId: string) => {
     confirm({
      title: 'Bạn có chắc chắn muốn xóa đăng ký lái thử này?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        try {
          await axios.delete(`/api/lich-lai-thu/${bookingId}`);
          message.success('Xóa đăng ký lái thử thành công');
          fetchBookings(); // Refresh list
        } catch (error) {
          message.error('Lỗi khi xóa đăng ký lái thử');
          console.error('Error deleting booking:', error);
        }
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'confirmed':
        return 'blue';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Đang chờ';
      case 'confirmed':
        return 'Đã xác nhận';
      case 'completed':
        return 'Đã hoàn thành';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const columns = [
    {
      title: 'ID Đăng ký',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Người dùng',
      dataIndex: ['UserID', 'UserName'],
      key: 'UserID.UserName',
      render: (text: string, record: OrderTestDrive) => record.UserID?.UserName || 'N/A',
    },
     {
      title: 'Email',
      dataIndex: ['UserID', 'Email'],
      key: 'UserID.Email',
      render: (text: string, record: OrderTestDrive) => record.UserID?.Email || 'N/A',
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['UserID', 'Phone'],
      key: 'UserID.Phone',
      render: (text: string, record: OrderTestDrive) => record.UserID?.Phone || 'N/A',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'Order_Date',
      key: 'Order_Date',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Ngày lái thử yêu cầu',
      dataIndex: 'Test_Drive_Date',
      key: 'Test_Drive_Date',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'Address',
      key: 'Address',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'Status',
      render: (status: string, record: OrderTestDrive) => (
        <Space>
          <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
          <Select
            value={status}
            onChange={(value) => handleUpdateStatus(record._id, value)}
            style={{ width: 150 }}
          >
            <Option value="pending">Đang chờ</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="completed">Đã hoàn thành</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </Space>
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'Notes',
      key: 'Notes',
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: OrderTestDrive) => (
        <Space size="middle">
          {/* No edit form needed for test drive bookings, only status update */}
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Title level={2} className="mb-6">Quản lý đăng ký lái thử</Title>

      <div className="mb-4">
        <Space>
          <Input.Search
            placeholder="Tìm kiếm ID, tên, email, SĐT người dùng"
            onSearch={(value) => handleSearch(value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Lọc theo trạng thái"
            allowClear
            style={{ width: 150 }}
            onChange={handleStatusChange}
          >
            <Option value="">Tất cả trạng thái</Option>
            <Option value="pending">Đang chờ</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="completed">Đã hoàn thành</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
           <RangePicker
            placeholder={['Từ ngày đặt', 'Đến ngày đặt']}
            onChange={handleDateRangeChange}
          />
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} đăng ký`,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default TestDriveBookingListPage; 