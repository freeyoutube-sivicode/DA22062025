import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Select, InputNumber, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import styles from './ProductFormPage.module.scss';
import { API_BASE_URL } from '../../api/config';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface ProductFormData {
  Product_Name: string;
  Description?: string;
  Price: number;
  Stock: number;
  CategoryID: string;
  Main_Image?: string;
  List_Image?: string;
  Specifications?: string;
  Status?: string;
}

const ProductFormPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ _id: string; Category_Name: string }[]>([]);

  const fetchProductData = async (productId: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/san-pham/${productId}`);
      const productData = response.data.data;

      console.log('Fetched product data:', productData);

      // Chuyển đổi dữ liệu để phù hợp với form
      const formData = {
        Product_Name: productData.Product_Name,
        Description: productData.Description || '',
        Price: productData.Price,
        Stock: productData.Stock,
        CategoryID: productData.CategoryID?._id,
        Main_Image: productData.Main_Image || '',
        List_Image: productData.List_Image?.join(',') || '',
        Specifications: productData.Specifications ? JSON.stringify(productData.Specifications, null, 2) : '',
        Status: productData.Status || 'available'
      };

      console.log('Formatted form data:', formData);

      // Điền dữ liệu vào form
      form.setFieldsValue(formData);
    } catch (error) {
      console.error('Error fetching product data:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu sản phẩm.',
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
    fetchCategories();
    if (isEditing && id) {
      fetchProductData(id);
    }
  }, [id, isEditing]);

  const onFinish = async (values: ProductFormData) => {
    setLoading(true);
    const dataToSend = {
      ...values,
      List_Image: values.List_Image ? values.List_Image.split(',').map(url => url.trim()) : [],
      Specifications: values.Specifications ? JSON.parse(values.Specifications) : {},
    };

    try {
      if (isEditing && id) {
        await axios.put(`${API_BASE_URL}/san-pham/${id}`, dataToSend);
        notification.success({
          message: 'Thành công',
          description: 'Cập nhật sản phẩm thành công.',
        });
      } else {
        await axios.post(`${API_BASE_URL}/san-pham`, dataToSend);
        notification.success({
          message: 'Thành công',
          description: 'Thêm sản phẩm mới thành công.',
        });
      }
      navigate('/admin/products');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error submitting product form:', error.message);
        notification.error({
          message: 'Lỗi',
          description: error.response?.data?.message || error.message || (isEditing ? 'Đã xảy ra lỗi khi cập nhật sản phẩm.' : 'Đã xảy ra lỗi khi thêm sản phẩm.'),
        });
      } else {
        console.error('Unexpected error:', error);
        notification.error({
          message: 'Lỗi',
          description: 'Đã xảy ra lỗi không mong muốn.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.productFormPage}>
      <div className={styles.header}>
        <Title level={2} className={styles.title}>{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Title>
      </div>
      <Card className={styles.formCard} loading={loading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          {...(!isEditing && { initialValues: { Stock: 0, Price: 0, Status: 'available' } })}
        >
          <Form.Item
            name="Product_Name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Description"
            label="Mô tả"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="Price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá!', type: 'number' }]}
          >
            <InputNumber 
              min={0} 
              style={{ width: '100%' }} 
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value: any) => value.replace(/\D/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="Stock"
            label="Tồn kho"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!', type: 'number' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="CategoryID"
            label="Danh mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select placeholder="Chọn danh mục">
              {categories.map(category => (
                <Option key={category._id} value={category._id}>{category.Category_Name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Main_Image"
            label="URL Hình ảnh chính"
            rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="List_Image"
            label="URLs Hình ảnh phụ (phân cách bằng dấu phẩy)"
          >
            <TextArea rows={2} placeholder="url1,url2,url3" />
          </Form.Item>

          <Form.Item
            name="Specifications"
            label="Thông số kỹ thuật (chuỗi JSON)"
          >
            <TextArea rows={4} placeholder='Enter specifications as JSON, e.g., { "Engine": "2.0L", "Horsepower": "155HP" }' />
          </Form.Item>

          <Form.Item
            name="Status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="available">Còn hàng</Option>
              <Option value="sold_out">Hết hàng</Option>
            </Select>
          </Form.Item>

          <Form.Item className={styles.formActions}>
            <Space>
              <Button onClick={() => navigate('/admin/products')}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isEditing ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProductFormPage; 