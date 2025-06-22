import React from 'react';

const NewsPage: React.FC = () => {
  return (
    <div className="news-page">
      {/* Page Banner */}
      <section className="page-banner news-page__banner">
        <div className="page-banner__container">
          <h1 className="page-banner__title">Tin Tức - Sự Kiện</h1>
          <p className="page-banner__subtitle">Cập nhật thông tin mới nhất từ BMW</p>
        </div>
      </section>

      {/* News List Section */}
      <section className="news-list-section">
        <div className="news-list-section__container">
          {/* Example News Item */}
          <div className="news-item">
            <div className="news-item__image">
              <img src="/images/default-news-image.jpg" alt="News Title" />
            </div>
            <div className="news-item__content">
              <h3 className="news-item__title">Tiêu Đề Tin Tức Mới Nhất</h3>
              <p className="news-item__meta">Ngày đăng: DD/MM/YYYY | Danh mục: Sự kiện</p>
              <p className="news-item__summary">Đây là đoạn tóm tắt ngắn gọn về nội dung của tin tức. Nó cung cấp cho người đọc cái nhìn tổng quan trước khi họ quyết định đọc chi tiết...</p>
              <a href="#" className="news-item__btn-more">Xem chi tiết</a>
            </div>
          </div>

          {/* Repeat news items as needed */}

          {/* Pagination */}
          <div className="news-pagination">
            {/* Pagination controls here */}
          </div>
        </div>
      </section>

      {/* Featured News Section (Optional) */}
      <section className="featured-news-section">
        <div className="featured-news-section__container">
          {/* Featured news content */}
        </div>
      </section>
    </div>
  );
};

export default NewsPage; 