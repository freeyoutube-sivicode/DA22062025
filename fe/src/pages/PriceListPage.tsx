import React, { useState } from 'react';

const PriceListPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    // Implement filtering logic here later
    console.log('Filtering for:', filter);
  };

  return (
    <div className="price-list-page">
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-banner__container">
          <h1 className="page-banner__title">Bảng Giá Xe BMW</h1>
          <p className="page-banner__subtitle">Cập nhật giá xe BMW mới nhất tại Việt Nam</p>
        </div>
      </div>

      {/* Price List Section */}
      <section className="price-list-section">
        <div className="price-list-section__container">
          {/* Price Filter */}
          <div className="price-filter">
            <div className="price-filter__row">
              <div className="price-filter__col">
                <h4 className="price-filter__title">Lọc theo dòng xe</h4>
              </div>
              <div className="price-filter__col">
                <div className="price-filter__buttons">
                  <button className={`price-filter__btn ${activeFilter === 'all' ? 'price-filter__btn--active' : ''}`}
                          onClick={() => handleFilterClick('all')}>Tất cả</button>
                  <button className={`price-filter__btn ${activeFilter === 'sedan' ? 'price-filter__btn--active' : ''}`}
                          onClick={() => handleFilterClick('sedan')}>Sedan</button>
                  <button className={`price-filter__btn ${activeFilter === 'suv' ? 'price-filter__btn--active' : ''}`}
                          onClick={() => handleFilterClick('suv')}>SUV</button>
                  <button className={`price-filter__btn ${activeFilter === 'coupe' ? 'price-filter__btn--active' : ''}`}
                          onClick={() => handleFilterClick('coupe')}>Coupe</button>
                  <button className={`price-filter__btn ${activeFilter === 'm' ? 'price-filter__btn--active' : ''}`}
                          onClick={() => handleFilterClick('m')}>BMW M</button>
                  <button className={`price-filter__btn ${activeFilter === 'i' ? 'price-filter__btn--active' : ''}`}
                          onClick={() => handleFilterClick('i')}>BMW i</button>
                </div>
              </div>
            </div>
          </div>

          {/* Price Table */}
          <div className="price-table-container">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Mẫu xe</th>
                  <th>Phiên bản</th>
                  <th>Giá niêm yết (VNĐ)</th>
                  <th>Khuyến mãi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* Sedan */}
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'sedan' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/new_bmw_3_series_sedan.webp" alt="BMW 3 Series" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW 3 Series</span>
                    </div>
                  </td>
                  <td>320i Sport Line</td>
                  <td>1.869.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 5%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'sedan' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/new_bmw_5_series.webp" alt="BMW 5 Series" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW 5 Series</span>
                    </div>
                  </td>
                  <td>530i Sport Line</td>
                  <td>2.969.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 3%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'sedan' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/7_series.webp" alt="BMW 7 Series" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW 7 Series</span>
                    </div>
                  </td>
                  <td>740Li Pure Excellence</td>
                  <td>5.369.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 2%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>

                {/* SUV */}
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'suv' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/x3_2_.webp" alt="BMW X3" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW X3</span>
                    </div>
                  </td>
                  <td>X3 xDrive20i</td>
                  <td>2.499.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 7%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'suv' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/x5_resize.webp" alt="BMW X5" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW X5</span>
                    </div>
                  </td>
                  <td>X5 xDrive40i xLine</td>
                  <td>3.469.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 5%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'suv' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/x7_1_.webp" alt="BMW X7" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW X7</span>
                    </div>
                  </td>
                  <td>X7 xDrive40i Pure Excellence</td>
                  <td>5.549.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 3%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>

                {/* Coupe */}
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'coupe' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/4_gc.webp" alt="BMW 4 Series" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW 4 Series</span>
                    </div>
                  </td>
                  <td>430i Coupe M Sport</td>
                  <td>2.999.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 5%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>

                {/* BMW M */}
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'm' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/di23_000192972.webp" alt="BMW M3" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW M3</span>
                    </div>
                  </td>
                  <td>M3 Competition</td>
                  <td>4.299.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 3%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'm' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/di23_000192972 (1).webp" alt="BMW M4" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW M4</span>
                    </div>
                  </td>
                  <td>M4 Competition</td>
                  <td>8.999.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 2%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>

                {/* BMW i */}
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'i' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/i4.webp" alt="BMW i4" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW i4</span>
                    </div>
                  </td>
                  <td>i4 eDrive40</td>
                  <td>3.599.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 7%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>
                <tr className={`price-table__row ${activeFilter !== 'all' && activeFilter !== 'i' ? 'hidden' : ''}`}>
                  <td>
                    <div className="price-table__model-info">
                      <img src="/images/new_bmw_ix3_series.webp" alt="BMW iX" className="price-table__model-image"/>
                      <span className="price-table__model-name">BMW iX3</span>
                    </div>
                  </td>
                  <td>iX3 xDrive50 Sport</td>
                  <td>4.699.000.000</td>
                  <td><span className="price-table__discount">Ưu đãi 5%</span></td>
                  <td><a href="/bang-gia/fake-price-list-id" className="price-table__btn-detail">Chi tiết</a></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Price Notes */}
          <div className="price-notes">
            <p><i className="fas fa-info-circle"></i> Giá xe đã bao gồm thuế VAT 10%</p>
            <p><i className="fas fa-info-circle"></i> Giá xe chưa bao gồm phí trước bạ, đăng ký biển số và các chi phí khác</p>
            <p><i className="fas fa-info-circle"></i> Giá có thể thay đổi tùy theo thời điểm và chính sách của BMW Việt Nam</p>
          </div>

          {/* Contact CTA */}
          <div className="contact-cta">
            <div className="contact-cta__row">
              <div className="contact-cta__col">
                <h3>Bạn cần tư vấn thêm về giá xe BMW?</h3>
                <p>Liên hệ với chúng tôi để nhận được tư vấn chi tiết và ưu đãi đặc biệt</p>
              </div>
              <div className="contact-cta__col">
                <a href="#" className="contact-cta__button">Liên hệ ngay</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PriceListPage; 