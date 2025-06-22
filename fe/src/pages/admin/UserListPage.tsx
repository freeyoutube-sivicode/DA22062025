import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, message, Modal, Form, Input, Select } from 'antd';
// Import Option from antd
// import { Option } from 'antd/es/select';
// import { Option } from 'antd';
// Import Option via Select
const { Option } = Select;
import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import axios from 'axios';

interface User {
  _id: string;
  Username: string;
  Email: string;
  Role: string;
  Status: string;
  CreatedAt: string;
  LastLogin: string;
}

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined);

  const fetchUsers = async (page: number = pagination.current, limit: number = pagination.pageSize, search: string = searchTerm, role: string | undefined = selectedRole) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/nguoi-dung?page=${page}&limit=${limit}&search=${search}&${role ? `role=${role}` : ''}`);
      setUsers(response.data.users);
      setPagination({
        ...pagination,
        current: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        total: response.data.pagination.total,
      });
    } catch (error) {
      message.error('Lỗi khi tải danh sách người dùng');
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, searchTerm, selectedRole]);

  const handleTableChange = (pagination: any) => {
    fetchUsers(pagination.current, pagination.pageSize);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      Username: user.Username,
      Email: user.Email,
      Role: user.Role,
    });
    setIsModalVisible(true);
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      await axios.put(`/api/nguoi-dung/${userId}`, { Status: newStatus });
      message.success('Cập nhật trạng thái người dùng thành công');
      fetchUsers();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái người dùng');
      console.error('Error updating user status:', error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        await axios.put(`/api/nguoi-dung/${editingUser._id}`, values);
        message.success('Cập nhật thông tin người dùng thành công');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      message.error('Lỗi khi cập nhật thông tin người dùng');
      console.error('Error updating user:', error);
    }
  };

  const columns = [
    {
      title: 'Tên đăng nhập',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'Role',
      key: 'Role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'Status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? 'Hoạt động' : 'Khóa'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Đăng nhập cuối',
      dataIndex: 'LastLogin',
      key: 'LastLogin',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          {record.Status === 'active' ? (
            <Button
              danger
              icon={<LockOutlined />}
              onClick={() => handleStatusChange(record._id, 'inactive')}
            >
              Khóa
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<UnlockOutlined />}
              onClick={() => handleStatusChange(record._id, 'active')}
            >
              Mở khóa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>

      <div className="mb-4">
        <Space>
          <Input.Search
            placeholder="Tìm kiếm theo tên đăng nhập, email, hoặc SĐT"
            onSearch={(value) => setSearchTerm(value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Lọc theo vai trò"
            allowClear
            style={{ width: 150 }}
            onChange={(value) => setSelectedRole(value === '' ? undefined : value)}
          >
            <Option value="">Tất cả vai trò</Option>
            <Option value="user">Người dùng</Option>
            <Option value="admin">Quản trị viên</Option>
          </Select>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} người dùng`,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title="Chỉnh sửa thông tin người dùng"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingUser(null);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="UserName"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
          >
            <Select
              placeholder="Chọn vai trò"
              disabled={editingUser?._id === localStorage.getItem('userId') && editingUser?.Role === 'admin'}
            >
              <Option value="user">Người dùng</Option>
              <Option value="admin">Quản trị viên</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserListPage; 