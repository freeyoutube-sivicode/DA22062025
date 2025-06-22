import React, { useState } from 'react';
import { FaCheckCircle, FaTools, FaCarCrash, FaTachometerAlt, FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';
import styles from './ServicePage.module.scss';
import axios from 'axios';
import { message } from 'antd';
import { API_BASE_URL } from '../api/config';
import moment from 'moment'; // Import moment for potential date handling if needed

const ServicePage: React.FC = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Phone: '',
    Email: '',
    CarModel: '',
    AppointmentDate: '',
    AppointmentTime: '',
    ServiceType: '',
    Notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation (can be enhanced)
    if (!formData.FullName || !formData.Phone || !formData.Email || !formData.CarModel || !formData.AppointmentDate || !formData.AppointmentTime || !formData.ServiceType) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }

    try {
      // Format date if necessary - sending as YYYY-MM-DD string should be fine for Mongoose Date type
      const dataToSend = {
          ...formData,
          // If backend expects a Date object, you might convert like this:
          // AppointmentDate: new Date(formData.AppointmentDate),
      };

      const response = await axios.post(`${API_BASE_URL}/service-requests`, dataToSend);

      if (response.data.success) {
        message.success('Yêu cầu đặt lịch đã được gửi thành công!');
        // Reset form fields
        setFormData({
          FullName: '',
          Phone: '',
          Email: '',
          CarModel: '',
          AppointmentDate: '',
          AppointmentTime: '',
          ServiceType: '',
          Notes: '',
        });
      } else {
        // Handle specific error messages from backend if any
        message.error(response.data.message || 'Đã xảy ra lỗi khi gửi yêu cầu đặt lịch.');
      }
    } catch (error: any) {
      console.error('Error submitting service request:', error);
      message.error(error.response?.data?.message || error.message || 'Đã xảy ra lỗi khi gửi yêu cầu đặt lịch.');
    }
  };

  return (
    <div className={styles['service-page']}>
      <div className="page-banner">
         <div className="page-banner__container">
            <h1 className="page-banner__title">DỊCH VỤ BẢO DƯỠNG VÀ SỬA CHỮA CHUYÊN NGHIỆP</h1>
            <p className="page-banner__subtitle">Chăm sóc toàn diện cho chiếc BMW của bạn với đội ngũ kỹ thuật viên hàng đầu và phụ tùng chính hãng.</p>
         </div>
      </div>

      <div className={styles['service-overview__container']}>
        <div className={styles['service-overview__row']}>
          <div className={styles['service-overview__col']}>
            <img src="/images/service_overview.jpg" alt="BMW Service" className={styles['service-overview__image']}/>
          </div>
          <div className={styles['service-overview__col']}>
            <h2 className={styles['service-overview__heading']}>TẠI SAO CHỌN DỊCH VỤ BMW?</h2>
            <p className={styles['service-overview__description']}>
              Với kinh nghiệm và sự chuyên môn cao, chúng tôi cam kết mang đến cho bạn trải nghiệm dịch vụ tốt nhất, giúp chiếc xe của bạn luôn hoạt động trong tình trạng hoàn hảo.
            </p>
            <div className={styles['service-overview__highlights']}>
              <div className={styles['service-overview__highlight-item']}>
                <FaCheckCircle className={styles['service-overview__highlight-icon']} />
                <span>Phụ tùng chính hãng 100%</span>
              </div>
              <div className={styles['service-overview__highlight-item']}>
                <FaCheckCircle className={styles['service-overview__highlight-icon']} />
                <span>Bảo hành dịch vụ toàn quốc</span>
              </div>
              <div className={styles['service-overview__highlight-item']}>
                <FaCheckCircle className={styles['service-overview__highlight-icon']} />
                <span>Kỹ thuật viên được đào tạo tại Đức</span>
              </div>
              <div className={styles['service-overview__highlight-item']}>
                <FaCheckCircle className={styles['service-overview__highlight-icon']} />
                <span>Công nghệ chẩn đoán hiện đại</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="section-title">CÁC GÓI DỊCH VỤ NỔI BẬT</h2>
        <div className={styles['service-categories__row']}>
          <div className={styles['service-card']}>
            <div className={styles['service-card__icon']}>
              <FaTools />
            </div>
            <h3 className={styles['service-card__title']}>Bảo Dưỡng Định Kỳ</h3>
            <p className={styles['service-card__description']}>
              Thực hiện kiểm tra và bảo dưỡng theo định kỳ để đảm bảo xe luôn vận hành ổn định và an toàn.
            </p>
          </div>

          <div className={`${styles['service-card']} ${styles.featured}`}>
            <div className={styles['service-card__badge']}>Phổ biến</div>
            <div className={styles['service-card__icon']}>
              <FaCarCrash />
            </div>
            <h3 className={styles['service-card__title']}>Sửa Chữa & Đồng Sơn</h3>
            <p className={styles['service-card__description']}>
              Khắc phục các hư hỏng, làm mới ngoại hình xe với quy trình sửa chữa và sơn tiêu chuẩn BMW.
            </p>
          </div>

          <div className={styles['service-card']}>
            <div className={styles['service-card__icon']}>
              <FaTachometerAlt />
            </div>
            <h3 className={styles['service-card__title']}>Nâng Cấp Hiệu Suất</h3>
            <p className={styles['service-card__description']}>
              Cải thiện sức mạnh và khả năng vận hành của xe với các gói nâng cấp chính hãng.
            </p>
          </div>
        </div>

        <h2 className="section-title">CÁC GÓI BẢO DƯỠNG ĐỊNH KỲ</h2>
        <div className={styles['service-packages__row']}>
          {/* Basic Package */}
          <div className={styles['package-card']}>
            <div className={styles['package-card__header']}>
              <h3 className={styles['package-card__title']}>Gói Cơ Bản</h3>
              <span className={styles['package-card__price']}>Liên hệ</span>
            </div>
            <div className={styles['package-card__body']}>
              <ul className={styles['package-card__features']}>
                <li><FaCheckCircle /> Thay dầu động cơ</li>
                <li><FaCheckCircle /> Thay lọc dầu</li>
                <li><FaCheckCircle /> Kiểm tra 20 điểm an toàn</li>
                <li><FaCheckCircle /> Cập nhật phần mềm cơ bản</li>
                <li><FaCheckCircle /> Vệ sinh nội thất cơ bản</li>
                <li className={styles['package-card__features--unavailable']}>
                  Thay lọc gió điều hòa
                </li>
                <li className={styles['package-card__features--unavailable']}>
                  Thay lọc gió động cơ
                </li>
                <li className={styles['package-card__features--unavailable']}>
                  Vệ sinh kim phun
                </li>
              </ul>
              <a href="#" className={styles['package-card__btn']}>Chọn gói</a>
            </div>
          </div>

          {/* Standard Package */}
          <div className={`${styles['package-card']} ${styles.featured}`}>
             <div className={styles['package-card__header']}>
              <h3 className={styles['package-card__title']}>Gói Tiêu Chuẩn</h3>
              <span className={styles['package-card__price']}>Liên hệ</span>
            </div>
            <div className={styles['package-card__body']}>
              <ul className={styles['package-card__features']}>
                <li><FaCheckCircle /> Thay dầu động cơ</li>
                <li><FaCheckCircle /> Thay lọc dầu</li>
                <li><FaCheckCircle /> Kiểm tra 30 điểm an toàn</li>
                <li><FaCheckCircle /> Cập nhật phần mềm đầy đủ</li>
                <li><FaCheckCircle /> Vệ sinh nội thất toàn diện</li>
                <li><FaCheckCircle /> Thay lọc gió điều hòa</li>
                <li><FaCheckCircle /> Thay lọc gió động cơ</li>
                <li className={styles['package-card__features--unavailable']}>
                  Vệ sinh kim phun
                </li>
              </ul>
              <a href="#" className={styles['package-card__btn']}>Chọn gói</a>
            </div>
          </div>

          {/* Premium Package */}
          <div className={styles['package-card']}>
             <div className={styles['package-card__header']}>
              <h3 className={styles['package-card__title']}>Gói Cao Cấp</h3>
              <span className={styles['package-card__price']}>Liên hệ</span>
            </div>
            <div className={styles['package-card__body']}>
              <ul className={styles['package-card__features']}>
                <li><FaCheckCircle /> Thay dầu động cơ cao cấp</li>
                <li><FaCheckCircle /> Thay lọc dầu</li>
                <li><FaCheckCircle /> Kiểm tra 40 điểm an toàn</li>
                <li><FaCheckCircle /> Cập nhật phần mềm đầy đủ</li>
                <li><FaCheckCircle /> Vệ sinh nội thất chuyên sâu</li>
                <li><FaCheckCircle /> Thay lọc gió điều hòa</li>
                <li><FaCheckCircle /> Thay lọc gió động cơ</li>
                <li><FaCheckCircle /> Vệ sinh kim phun</li>
              </ul>
              <a href="#" className={styles['package-card__btn']}>Chọn gói</a>
            </div>
          </div>
        </div>

        <h2 className="section-title">TRUNG TÂM DỊCH VỤ BMW</h2>
        <div className={styles['service-locations__row']}>
          {/* Location Card 1 */}
          <div className={styles['location-card']}>
            <div className={styles['location-card__info']}>
              <h3 className={styles['location-card__name']}>BMW Service Hà Nội</h3>
              <p className={styles['location-card__address']}>
                <FaMapMarkerAlt />
                Số 132 Lê Duẩn, Đống Đa, Hà Nội
              </p>
              <p className={styles['location-card__phone']}>
                <FaPhone />
                024.3333.7777
              </p>
              <p className={styles['location-card__hours']}>
                <FaClock />
                Thứ 2 - Thứ 7: 8:00 - 17:30
              </p>
            </div>
            <a href="#" className={styles['location-card__btn']}>Xem bản đồ</a>
          </div>

          {/* Location Card 2 */}
          <div className={styles['location-card']}>
            <div className={styles['location-card__info']}>
              <h3 className={styles['location-card__name']}>BMW Service Hồ Chí Minh</h3>
              <p className={styles['location-card__address']}>
                <FaMapMarkerAlt />
                Số 245 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh
              </p>
              <p className={styles['location-card__phone']}>
                <FaPhone />
                028.3333.7777
              </p>
              <p className={styles['location-card__hours']}>
                <FaClock />
                Thứ 2 - Thứ 7: 8:00 - 17:30
              </p>
            </div>
            <a href="#" className={styles['location-card__btn']}>Xem bản đồ</a>
          </div>
        </div>
      </div>

      {/* Service Booking Form Section */}
      <section className={`${styles['booking-form-section']} booking-form-section`}>
         <div className={`${styles['booking-form-section__container']} booking-form-section__container`}>
            <div className={`${styles['booking-form']} booking-form`}>
               <h2 className={`${styles['booking-form__title']} booking-form__title`}>ĐẶT LỊCH DỊCH VỤ</h2>
               <p className={`${styles['booking-form__subtitle']} booking-form__subtitle`}>Điền thông tin để đặt lịch dịch vụ tại trung tâm BMW gần nhất</p>
               <form className={`${styles['booking-form__form']} booking-form__form`} onSubmit={handleSubmit}>
                  <div className={`${styles['booking-form__row']} booking-form__row`}>
                     <div className={`${styles['booking-form__col']} booking-form__col`}>
                        <label htmlFor="fullName" className={`${styles['booking-form__label']} booking-form__label`}>Họ và tên</label>
                        <input type="text" id="FullName" className={`${styles['booking-form__input']} booking-form__input`} placeholder="Nhập họ và tên" value={formData.FullName} onChange={handleInputChange} />
                     </div>
                     <div className={`${styles['booking-form__col']} booking-form__col`}>
                        <label htmlFor="phoneNumber" className={`${styles['booking-form__label']} booking-form__label`}>Số điện thoại</label>
                        <input type="text" id="Phone" className={`${styles['booking-form__input']} booking-form__input`} placeholder="Nhập số điện thoại" value={formData.Phone} onChange={handleInputChange} />
                     </div>
                  </div>

                  <div className={`${styles['booking-form__row']} booking-form__row`}>
                     <div className={`${styles['booking-form__col']} booking-form__col`}>
                        <label htmlFor="email" className={`${styles['booking-form__label']} booking-form__label`}>Email</label>
                        <input type="email" id="Email" className={`${styles['booking-form__input']} booking-form__input`} placeholder="Nhập email" value={formData.Email} onChange={handleInputChange} />
                     </div>
                     <div className={`${styles['booking-form__col']} booking-form__col`}>
                        <label htmlFor="carModel" className={`${styles['booking-form__label']} booking-form__label`}>Mẫu xe</label>
                        <select id="CarModel" className={`${styles['booking-form__select']} booking-form__select`} value={formData.CarModel} onChange={handleInputChange}>
                           <option value="">Chọn mẫu xe</option>
                           {/* Add car model options here dynamically if needed, or hardcode */} 
                           <option value="BMW 3 Series">BMW 3 Series</option>
                           <option value="BMW 5 Series">BMW 5 Series</option>
                           <option value="BMW X3">BMW X3</option>
                           <option value="BMW X5">BMW X5</option>
                           <option value="Other">Khác</option>
                        </select>
                     </div>
                  </div>

                   <div className={`${styles['booking-form__row']} booking-form__row`}>
                     <div className={`${styles['booking-form__col']} booking-form__col`}>
                        <label htmlFor="bookingDate" className={`${styles['booking-form__label']} booking-form__label`}>Ngày đặt lịch</label>
                         {/* Using type="date" provides a native date picker */} 
                         <input type="date" id="AppointmentDate" className={`${styles['booking-form__input']} booking-form__input`} placeholder="mm/dd/yyyy" value={formData.AppointmentDate} onChange={handleInputChange} />
                     </div>
                     <div className={`${styles['booking-form__col']} booking-form__col`}>
                        <label htmlFor="bookingTime" className={`${styles['booking-form__label']} booking-form__label`}>Thời gian</label>
                        <select id="AppointmentTime" className={`${styles['booking-form__select']} booking-form__select`} value={formData.AppointmentTime} onChange={handleInputChange}>
                           <option value="">Chọn thời gian</option>
                           {/* Add time options based on backend enum */} 
                           <option value="08:00">08:00</option>
                           <option value="10:00">10:00</option>
                           <option value="13:00">13:00</option>
                           <option value="15:00">15:00</option>
                           <option value="17:00">17:00</option>
                        </select>
                     </div>
                  </div>

                   <div className={`${styles['booking-form__row']} booking-form__row ${styles['booking-form__full-width']}`}>
                     <div className={`${styles['booking-form__col']} booking-form__col`}>
                        <label htmlFor="serviceType" className={`${styles['booking-form__label']} booking-form__label`}>Loại dịch vụ</label>
                        <select id="ServiceType" className={`${styles['booking-form__select']} booking-form__select`} value={formData.ServiceType} onChange={handleInputChange}>
                           <option value="">Chọn loại dịch vụ</option>
                           {/* Options based on backend enum */} 
                           <option value="Bảo dưỡng định kỳ">Bảo dưỡng định kỳ</option>
                           <option value="Sửa chữa">Sửa chữa</option>
                           <option value="Đồng sơn">Đồng sơn</option>
                           <option value="Nâng cấp hiệu suất">Nâng cấp hiệu suất</option>
                           <option value="Khác">Khác</option>
                        </select>
                     </div>
                  </div>

                   {/* Optional: Additional notes/message */}
                   <div className={`${styles['booking-form__row']} booking-form__row ${styles['booking-form__full-width']}`}>
                      <div className={`${styles['booking-form__col']} booking-form__col`}>
                         <label htmlFor="notes" className={`${styles['booking-form__label']} booking-form__label`}>Ghi chú (Tùy chọn)</label>
                         {/* Use a textarea for notes */} 
                         <textarea id="Notes" className={`${styles['booking-form__textarea']} booking-form__textarea`} rows={4} value={formData.Notes} onChange={handleInputChange}></textarea>
                      </div>
                   </div>

                  <div className={`${styles['booking-form__actions']} booking-form__actions`}>
                     <button type="submit" className={`${styles['booking-form__btn-submit']} booking-form__btn-submit btn btn--primary`}>Đặt lịch ngay</button>
                  </div>
               </form>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ServicePage; 