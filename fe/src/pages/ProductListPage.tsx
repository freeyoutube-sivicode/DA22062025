import React, { useState, useEffect } from 'react';
import { Product } from '../api/types'; // Import Product type
import ProductCard from '../components/product/ProductCard'; // Import ProductCard component
import axios from 'axios';
import { API_BASE_URL } from '../api/config';
import { Spin, Pagination, message, notification } from 'antd'; // Import Spin, Pagination, message, notification
import styles from './ProductListPage.module.scss'; // Import the SCSS module

interface Category {
  _id: string;
  Category_Name: string;
}

const ProductListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt'); // Mặc định sắp xếp theo ngày tạo
  const [sortOrder, setSortOrder] = useState('desc'); // Mặc định giảm dần (mới nhất)
  const [viewOption, setViewOption] = useState('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState(''); // Thêm state cho tìm kiếm
  const [categories, setCategories] = useState<Category[]>([]); // State to store categories
  const [categoriesLoading, setCategoriesLoading] = useState(false); // State for categories loading

  const fetchProducts = async (page: number = pagination.current, limit: number = pagination.pageSize, categoryId: string | 'all' = activeCategory, sortByKey: string = sortBy, sortOrderVal: string = sortOrder, search: string = searchKeyword) => {
    setLoading(true);
    try {
      const categoryParam = categoryId === 'all' ? '' : `categoryId=${categoryId}`;
      const searchParam = search ? `search=${search}` : '';
      const sortParam = `sortBy=${sortByKey}&sortOrder=${sortOrderVal}`;

      const response = await axios.get(`${API_BASE_URL}/san-pham?page=${page}&limit=${limit}&${searchParam}&${categoryParam}&${sortParam}`);
      
      // Assuming the API response has a structure like { products: [...], pagination: { total, page, limit, totalPages } }
      setProducts(response.data.products);
      setPagination({
        current: response.data.pagination.page,
        pageSize: response.data.pagination.limit,
        total: response.data.pagination.total,
      });

    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Không thể tải danh sách sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/danh-muc`);
      // Assuming the response structure is { categories: [...] }
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Không thể tải danh sách danh mục.');
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Initial fetch for categories and products
  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories only once on mount

  useEffect(() => {
    // Fetch products whenever pagination, category, sort, or search changes
    fetchProducts(pagination.current, pagination.pageSize, activeCategory, sortBy, sortOrder, searchKeyword);
  }, [pagination.current, pagination.pageSize, activeCategory, sortBy, sortOrder, searchKeyword]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setPagination(prev => ({ ...prev, current: 1 })); // Reset to first page on category change
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [key, order] = event.target.value.split('-');
    setSortBy(key);
    setSortOrder(order || 'asc'); // Default to asc if order is not specified (e.g., newest)
    setPagination(prev => ({ ...prev, current: 1 })); // Reset to first page on sort change
  };

  const handleViewChange = (view: string) => {
    setViewOption(view);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setPagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
  };

  // Function to handle adding product to cart
  const handleAddToCart = async (productId: string) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        notification.warning({
          message: 'Vui lòng đăng nhập',
          description: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng',
        });
        return;
      }

      await axios.post(`${API_BASE_URL}/gio-hang/${userId}/items`, {
        ProductID: productId,
        quantity: 1,
        Price: products.find(p => p._id === productId)?.Price || 0
      });

      notification.success({
        message: 'Thành công',
        description: 'Đã thêm sản phẩm vào giỏ hàng',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể thêm sản phẩm vào giỏ hàng',
      });
    }
  };

  return (
    <div className="product-list-page">
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-banner__container">
          <h1 className="page-banner__title">Sản Phẩm BMW</h1>
          <p className="page-banner__subtitle">Khám phá dòng xe BMW đẳng cấp và sang trọng</p>
        </div>
      </div>

      {/* Product List Section */}
      <section className="product-list-section">
        <div className="product-list-section__container">

          {/* Product Categories Tabs */}
          <div className="product-categories-tabs">
            <button className={`product-categories-tabs__tab ${activeCategory === 'all' ? 'product-categories-tabs__tab--active' : ''}`}
                    onClick={() => handleCategoryClick('all')}>Tất cả</button>
            {/* Render categories dynamically */}
            {categoriesLoading ? (
              <span>Đang tải danh mục...</span>
            ) : (
              categories.map(category => (
                <button
                  key={category._id}
                  className={`product-categories-tabs__tab ${activeCategory === category._id ? 'product-categories-tabs__tab--active' : ''}`}
                  onClick={() => handleCategoryClick(category._id)}
                >
                  {category.Category_Name}
                </button>
              ))
            )}
          </div>

          {/* Product Filter and View Options */}
          <div className="product-filter-options">
            <div className="product-filter-options__sort-by">
              <label htmlFor="sortBy">Sắp xếp theo:</label>
              <select id="sortBy" className="product-filter-options__select" value={`${sortBy}-${sortOrder}`} onChange={handleSortChange}>
                <option value="createdAt-desc">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="Product_Name-asc">Tên: A-Z</option>
              </select>
            </div>
            <div className="product-filter-options__view">
              <span>Hiển thị:</span>
              <button className={`product-filter-options__view-btn ${viewOption === 'grid' ? 'product-filter-options__view-btn--active' : ''}`}
                      onClick={() => handleViewChange('grid')}>
                <i className="fas fa-th"></i>
              </button>
              <button className={`product-filter-options__view-btn ${viewOption === 'list' ? 'product-filter-options__view-btn--active' : ''}`}
                      onClick={() => handleViewChange('list')}>
                <i className="fas fa-list"></i>
              </button>
            </div>
          </div>

          {/* Product List */}
          <Spin spinning={loading}>
            <div className={`${styles['product-list']} ${viewOption === 'list' ? styles['product-list--list-view'] : ''}`}>
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
              {products.length === 0 && !loading && (
                <div className="no-products-found">Không tìm thấy sản phẩm nào.</div>
              )}
            </div>
          </Spin>

          {/* Pagination */}
          {pagination.total > 0 && (
            <div className="product-list-pagination">
               <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  onChange={handlePageChange}
                  showSizeChanger
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} sản phẩm`}
                />
            </div>
          )}

        </div>
      </section>

      {/* Featured Product Section */}
      <section className="featured-product-section">
        <div className="featured-product-section__container">
          <div className="featured-product-section__row">
            <div className="featured-product-section__col">
              <div className="featured-product-section__content">
                <span className="featured-product-section__label">Sản phẩm nổi bật</span>
                <h2 className="featured-product-section__title">BMW X5 M Competition</h2>
                <p className="featured-product-section__description">
                  Sự kết hợp hoàn hảo giữa hiệu suất thể thao M và sự sang trọng của dòng SUV X5. Với động cơ V8 4.4L Twin-Turbo mạnh mẽ, BMW X5 M Competition mang đến trải nghiệm lái xe đỉnh cao.
                </p>
                <div className="featured-product-section__specs">
                  <div className="featured-product-section__spec-item">
                    <span className="featured-product-section__spec-value">625</span>
                    <span className="featured-product-section__spec-label">Mã lực</span>
                  </div>
                  <div className="featured-product-section__spec-item">
                    <span className="featured-product-section__spec-value">3.8</span>
                    <span className="featured-product-section__spec-label">0-100 km/h (giây)</span>
                  </div>
                  <div className="featured-product-section__spec-item">
                    <span className="featured-product-section__spec-value">250</span>
                    <span className="featured-product-section__spec-label">Tốc độ tối đa (km/h)</span>
                  </div>
                </div>
                <div className="featured-product-section__actions">
                  <a href="#" className="featured-product-section__btn-detail">Khám phá ngay</a>
                  <a href="#" className="featured-product-section__btn-test">Đặt lái thử</a>
                </div>
              </div>
            </div>
            <div className="featured-product-section__col">
              <div className="featured-product-section__image">
                <img src="/images/bmw-x5m.jpg" alt="BMW X5 M Competition" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Products Section */}
      <section className="compare-products-section">
        <div className="compare-products-section__container">
          <h2 className="compare-products-section__title">SO SÁNH XE</h2>
          <p className="compare-products-section__subtitle">So sánh các mẫu xe BMW để tìm ra chiếc xe phù hợp nhất với bạn</p>

          <div className="compare-products-section__compare-container">
            <div className="compare-products-section__row">
              <div className="compare-products-section__col">
                <div className="compare-products-section__select-group">
                  <label htmlFor="compare1">Xe thứ nhất</label>
                  <select id="compare1" className="compare-products-section__select">
                    <option value="">Chọn xe</option>
                    {/* Options can be generated from product data later */}
                    <option value="3-series">BMW 3 Series</option>
                    <option value="5-series">BMW 5 Series</option>
                    <option value="7-series">BMW 7 Series</option>
                    <option value="x3">BMW X3</option>
                    <option value="x5">BMW X5</option>
                    <option value="x7">BMW X7</option>
                  </select>
                </div>
              </div>
              <div className="compare-products-section__col">
                <div className="compare-products-section__select-group">
                  <label htmlFor="compare2">Xe thứ hai</label>
                  <select id="compare2" className="compare-products-section__select">
                    <option value="">Chọn xe</option>
                    {/* Options can be generated from product data later */}
                    <option value="3-series">BMW 3 Series</option>
                    <option value="5-series">BMW 5 Series</option>
                    <option value="7-series">BMW 7 Series</option>
                    <option value="x3">BMW X3</option>
                    <option value="x5">BMW X5</option>
                    <option value="x7">BMW X7</option>
                  </select>
                </div>
              </div>
              <div className="compare-products-section__col">
                <div className="compare-products-section__select-group">
                  <label htmlFor="compare3">Xe thứ ba (tùy chọn)</label>
                  <select id="compare3" className="compare-products-section__select">
                    <option value="">Chọn xe</option>
                    {/* Options can be generated from product data later */}
                    <option value="3-series">BMW 3 Series</option>
                    <option value="5-series">BMW 5 Series</option>
                    <option value="7-series">BMW 7 Series</option>
                    <option value="x3">BMW X3</option>
                    <option value="x5">BMW X5</option>
                    <option value="x7">BMW X7</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="compare-products-section__actions">
              <button className="compare-products-section__btn-compare">So sánh ngay</button>
            </div>
          </div>
        </div>
      </section>

      {/* Test Drive CTA Section */}
      <section className="test-drive-cta-section">
        <div className="test-drive-cta-section__container">
          <div className="test-drive-cta-section__row">
            <div className="test-drive-cta-section__col">
              <div className="test-drive-cta-section__content">
                <h2 className="test-drive-cta-section__title">Đặt lịch lái thử</h2>
                <p className="test-drive-cta-section__description">
                  Trải nghiệm cảm giác lái đỉnh cao cùng BMW. Đặt lịch lái thử ngay hôm nay để cảm nhận sự khác biệt.
                </p>
                <a href="#" className="test-drive-cta-section__btn-cta">Đặt lịch ngay</a>
              </div>
            </div>
            <div className="test-drive-cta-section__col">
              <div className="test-drive-cta-section__image">
                <img src="/images/test-drive.jpg" alt="BMW Test Drive" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductListPage; 