import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Space, Typography, Modal, Input, Select, Spin, notification, Card, Popconfirm, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import styles from './ProductListPage.module.scss';
import { API_BASE_URL } from '../../api/config';

const { Title } = Typography;
const { confirm } = Modal;
const { Option } = Select;

interface Product {
  _id: string;
  Product_Name: string;
  Price: number;
  Stock: number;
  CategoryID: { _id: string; Category_Name: string };
  Description?: string;
  Main_Image?: string;
  List_Image?: string[];
  Specifications?: any;
  Status?: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  Category_Name: string;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/san-pham`, {
        params: {
          page: pagination.current,
          limit: pagination.pageSize,
          search: searchText,
          sortBy: sortColumn === 'Product_Name' ? 'Product_Name' : sortColumn === 'Price' ? 'Price' : sortColumn === 'Stock' ? 'Stock' : sortColumn,
          order: sortOrder === 'ascend' ? 'asc' : sortOrder === 'descend' ? 'desc' : undefined,
          category: selectedCategory,
        },
      });
      setProducts(response.data.products);
      setPagination({
        ...pagination,
        total: response.data.pagination.total,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách sản phẩm.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/danh-muc`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách danh mục.',
      });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [pagination.current, pagination.pageSize, searchText, sortOrder, sortColumn, selectedCategory]);

  const handleDeleteProduct = async (productId: string) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        try {
          await axios.delete(`${API_BASE_URL}/san-pham/${productId}`);
          notification.success({
            message: 'Thành công',
            description: 'Sản phẩm đã được xóa.',
          });
          fetchProducts();
        } catch (error) {
          console.error('Error deleting product:', error);
          notification.error({
            message: 'Lỗi',
            description: 'Không thể xóa sản phẩm.',
          });
        }
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPagination({ ...pagination, current: 1 });
  };

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'Main_Image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="Product" style={{ width: 50, height: 50, objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'Product_Name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.Product_Name.localeCompare(b.Product_Name),
    },
    {
      title: 'Giá',
      dataIndex: 'Price',
      key: 'price',
      render: (price: number) => price.toLocaleString('vi-VN') + ' đ',
      sorter: (a: Product, b: Product) => a.Price - b.Price,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'Stock',
      key: 'stock',
      sorter: (a: Product, b: Product) => a.Stock - b.Stock,
    },
    {
      title: 'Danh mục',
      dataIndex: ['CategoryID', 'Category_Name'],
      key: 'category',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'available' ? 'green' : 'red'}>
          {status === 'available' ? 'Còn hàng' : 'Hết hàng'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/products/edit/${record._id}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => handleDeleteProduct(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setPagination(pagination);
    if (sorter && sorter.columnKey) {
      setSortColumn(sorter.columnKey === 'Product_Name' ? 'Product_Name' : sorter.columnKey === 'Price' ? 'Price' : sorter.columnKey === 'Stock' ? 'Stock' : sorter.columnKey);
      setSortOrder(sorter.order);
    } else {
      setSortColumn(undefined);
      setSortOrder(undefined);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.Product_Name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || product.CategoryID._id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.productListPage}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>Quản lý sản phẩm</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/products/add')} className={styles.addButton}>
          Thêm sản phẩm
        </Button>
      </div>

      <Card className={styles.filterCard}>
        <Space size="large">
          <Input
            placeholder="Tìm kiếm sản phẩm"
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Lọc theo danh mục"
            style={{ width: 200 }}
            onChange={handleCategoryChange}
            allowClear
          >
            <Option value="">Tất cả danh mục</Option>
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.Category_Name}
              </Option>
            ))}
          </Select>
        </Space>
      </Card>

      <Spin spinning={loading}>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={filteredProducts}
          rowKey="_id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} sản phẩm`,
          }}
          onChange={handleTableChange}
        />
      </Spin>
    </div>
  );
};

export default ProductListPage; 