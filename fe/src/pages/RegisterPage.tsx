import { RegisterData } from '../api/types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setUser } from '../store/slices/authSlice';
import { authService } from '../api/services/auth';
import { toast } from 'react-toastify';
import styles from './RegisterPage.module.scss';
// Import Font Awesome CSS if you are using it for icons
// import '@fortawesome/fontawesome-free/css/all.min.css';

// Import icons (assuming you are using Font Awesome or similar) or use Ant Design icons
// For simplicity, I'll use placeholder <i> tags.
// import { UserOutlined, MailOutlined, PhoneOutlined, LockOutlined, HomeOutlined } from '@ant-design/icons';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    UserName: '',
    Email: '',
    Phone: '',
    FullName: '',
    Address: '',
    Password: '',
    ConfirmPassword: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend Validation
    if (!formData.UserName || !formData.Email || !formData.Phone || !formData.Password || !formData.ConfirmPassword) {
      toast.error('Vui lòng điền đầy đủ thông tin các trường bắt buộc.');
      return;
    }

    // Basic Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.Email)) {
      toast.error('Email không hợp lệ.');
      return;
    }

    // Basic Phone number validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.Phone)) {
      toast.error('Số điện thoại không hợp lệ (chỉ chấp nhận 10 chữ số).');
      return;
    }

    // Password minimum length validation (matching backend schema if possible)
    if (formData.Password.length < 6) {
        toast.error('Mật khẩu phải có ít nhất 6 ký tự.');
        return;
    }

    // Confirm Password validation (existing logic, improved message)
    if (formData.Password !== formData.ConfirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp với mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      // Construct registerData with required and optionally provided fields
      const registerData = {
        UserName: formData.UserName,
        Email: formData.Email,
        Phone: formData.Phone,
        Password: formData.Password,
        // Include FullName and Address if they are present in the form data
        ...(formData.FullName && { FullName: formData.FullName }),
        ...(formData.Address && { Address: formData.Address }),
        Role: 'user',
        Status: 'active',
      };

      // Type assertion to inform TypeScript about the structure
      const dataToSend: RegisterData = registerData as RegisterData;

      const user = await authService.register(dataToSend);
      dispatch(setUser(user));
      toast.success('Đăng ký thành công!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Có lỗi xảy ra khi đăng ký');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__container}>
        <h2 className={styles.register__title}>Đăng ký tài khoản mới</h2>
        <form onSubmit={handleSubmit} className={styles.register__form}>
          {/* Tên đăng nhập */}
          <div className={styles['register__form-group']}>
            <label htmlFor="username" className="sr-only">Tên đăng nhập</label>
            <div className={styles['register__input-group']}>
              <div className={styles['register__input-group-icon']}>
                 <i className="fas fa-user"></i> {/* Example icon */}
              </div>
              <input
                type="text"
                id="username"
                name="UserName"
                value={formData.UserName}
                onChange={handleInputChange}
                required
                placeholder="Tên đăng nhập"
                className={styles.register__input}
              />
            </div>
          </div>

          {/* Email */}
          <div className={styles['register__form-group']}>
            <label htmlFor="email" className="sr-only">Email</label>
             <div className={styles['register__input-group']}>
                <div className={styles['register__input-group-icon']}>
                   <i className="fas fa-envelope"></i> {/* Example icon */}
                </div>
                <input
                  type="email"
                  id="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  required
                  placeholder="Email"
                  className={styles.register__input}
                />
             </div>
          </div>

          {/* Số điện thoại */}
          <div className={styles['register__form-group']}>
            <label htmlFor="phone" className="sr-only">Số điện thoại</label>
            <div className={styles['register__input-group']}>
               <div className={styles['register__input-group-icon']}>
                  <i className="fas fa-phone"></i> {/* Example icon */}
               </div>
               <input
                type="tel"
                id="phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                required
                placeholder="Số điện thoại"
                className={styles.register__input}
              />
            </div>
          </div>

          {/* Họ và tên */}
          <div className={styles['register__form-group']}>
            <label htmlFor="fullName" className="sr-only">Họ và tên</label>
            <div className={styles['register__input-group']}>
                <div className={styles['register__input-group-icon']}>
                   <i className="fas fa-user"></i> {/* Example icon */}
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="FullName"
                  value={formData.FullName}
                  onChange={handleInputChange}
                  placeholder="Họ và tên"
                  className={styles.register__input}
                />
            </div>
          </div>

          {/* Địa chỉ */}
          <div className={styles['register__form-group']}>
            <label htmlFor="address" className="sr-only">Địa chỉ</label>
            <div className={styles['register__input-group']}>
               <div className={styles['register__input-group-icon']}>
                  <i className="fas fa-map-marker-alt"></i> {/* Example icon */}
               </div>
               <input
                type="text"
                id="address"
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
                placeholder="Địa chỉ"
                className={styles.register__input}
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div className={styles['register__form-group']}>
            <label htmlFor="password" className="sr-only">Mật khẩu</label>
            <div className={styles['register__input-group']}>
               <div className={styles['register__input-group-icon']}>
                  <i className="fas fa-lock"></i> {/* Example icon */}
               </div>
               <input
                type="password"
                id="password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                required
                placeholder="Mật khẩu"
                className={styles.register__input}
              />
            </div>
          </div>

          {/* Xác nhận mật khẩu */}
          <div className={styles['register__form-group']}>
            <label htmlFor="confirmPassword" className="sr-only">Xác nhận mật khẩu</label>
            <div className={styles['register__input-group']}>
               <div className={styles['register__input-group-icon']}>
                  <i className="fas fa-lock"></i> {/* Example icon */}
               </div>
               <input
                type="password"
                id="confirmPassword"
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Xác nhận mật khẩu"
                className={styles.register__input}
              />
            </div>
          </div>

          <div className={styles['register__form-group']}>
            <button
              type="submit"
              disabled={loading}
              className={styles.register__button}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </div>
        </form>
        <p className={styles['register__login-text']}>
          Đã có tài khoản? <Link to="/login" className={styles.register__login_link}>Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 