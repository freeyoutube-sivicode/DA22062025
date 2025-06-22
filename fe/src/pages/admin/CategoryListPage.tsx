import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

interface Category {
  _id: string;
  Category_Name: string;
  Description: string;
  CreatedAt: string;
  UpdatedAt: string;
}

const CategoryListPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCategories = async (page: number = pagination.current, limit: number = pagination.pageSize) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/danh-muc?page=${page}&limit=${limit}`);
      setCategories(response.data.categories);
      setPagination({
        ...pagination,
        current: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        total: response.data.pagination.total,
      });
    } catch (error) {
      message.error('Lỗi khi tải danh sách danh mục');
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTableChange = (pagination: any) => {
    fetchCategories(pagination.current, pagination.pageSize);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      Category_Name: category.Category_Name,
      Description: category.Description,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/danh-muc/${id}`);
      message.success('Xóa danh mục thành công');
      fetchCategories();
    } catch (error) {
      message.error('Lỗi khi xóa danh mục');
      console.error('Error deleting category:', error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await axios.put(`/api/danh-muc/${editingCategory._id}`, values);
        message.success('Cập nhật danh mục thành công');
      } else {
        await axios.post('/api/danh-muc', values);
        message.success('Thêm danh mục thành công');
      }
      setIsModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error('Lỗi khi lưu danh mục');
      console.error('Error saving category:', error);
    }
  };

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'Category_Name',
      key: 'Category_Name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'Description',
      key: 'Description',
      ellipsis: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Cập nhật lần cuối',
      dataIndex: 'UpdatedAt',
      key: 'UpdatedAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Category) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Thêm danh mục
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} danh mục`,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title={editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Category_Name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryListPage; 